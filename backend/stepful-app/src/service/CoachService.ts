import dayjs from 'dayjs';
import { CoachDatasource } from '../datasource/coach/CoachDatasource';
import { CoachAvailability, ScheduledBlock, TimeBlock, CallScore, Score } from '../models/types';
import * as uuid from 'uuid';
import { TimeUtils } from '../utils/timeUtils';
import { ScheduleConflictError } from '../errors/ScheduleConflictError';

export class CoachService {
  constructor(private datasource: CoachDatasource) {}

  async getAvailableTimes(
    coachId: string,
    startDate: string,
    endDate: string
  ): Promise<CoachAvailability[]> {
    return await this.datasource.getAvailabilityForCoach(coachId, startDate, endDate);
  }
  /**
   * This merges avalability blocks into a contiguous block if the added avalability has any overlap
   */
  async addAvailibility(arg0: CoachAvailability) {
    arg0.availabilityId = uuid.v4();
    const overlappingBlocks = await this.datasource.getAvailabilityForCoachOverlappingWith(arg0);
    console.log('OVERlapping', overlappingBlocks);
    if (overlappingBlocks.length > 0) {
      //TODO: this should be in a transaction
      for (var block of overlappingBlocks) {
        arg0.startTime = dayjs(arg0.startTime).isBefore(block.startTime)
          ? arg0.startTime
          : block.startTime;
        arg0.endTime = dayjs(arg0.endTime).isAfter(block.endTime) ? arg0.endTime : block.endTime;
      }
    }

    await this.datasource.insertAvailabilityForCoach(arg0);
    //TODO: this should be in a transaction
    for (var block of overlappingBlocks) {
      await this.datasource.deleteAvailability(block.availabilityId);
    }
  }

  async getUpComingCalls(coachId: string, startDate: string, endDate: string) {
    return await this.datasource.getScheduledCallsForCoach(coachId, startDate, endDate);
  }

  async assertInsertability(coachId: string, block: ScheduledBlock) {
    const scheduledBlocks: TimeBlock[] = await this.datasource.getScheduledCallsForCoach(
      coachId,
      block.startTime,
      block.endTime
    );
    for (var exisitingBlock of scheduledBlocks) {
      if (TimeUtils.blockOverlaps(block, exisitingBlock)) {
        throw new ScheduleConflictError('Time already taken');
      }
    }
    const availableBlocks: TimeBlock[] = await this.getAvailableTimes(
      coachId,
      block.startTime,
      block.endTime
    );
    for (var exisitingBlock of availableBlocks) {
      if (TimeUtils.isWithin(block, exisitingBlock)) {
        return;
      }
    }
    throw new ScheduleConflictError('Time cannot be in available times');
  }

  async scheduleUpcomingCall(coachId: string, block: ScheduledBlock) {
    block.blockId = uuid.v4();
    block.coachId = coachId;
    await this.assertInsertability(coachId, block);
    await this.datasource.insertScheduledBlock(block);
  }

  async getScoresAssignedBy(coachId: string): Promise<CallScore[]> {
    return await this.datasource.getScoresAssignedBy(coachId);
  }

  upsertBlockScore(coachId: string, blockId: string, score: Score) {
    return this.datasource.upsertBlockScore(coachId, { ...score, blockId });
  }
}
