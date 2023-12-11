import { CallScore, CoachAvailability, ScheduledBlock, Score, TimeBlock } from '../../models/types';
import { Pool } from 'postgresql-client';
import { CoachDataMapper } from './CoachDataMapper';
import { BaseDatasource } from '../BaseDatasource';
import {
  deleteAvailabilityQuery,
  getCoachAssignedScores,
  getCoachAvailibilityOverlappingQuery,
  getCoachAvailibilityQuery,
  getCoachScheduleQueries,
  insertCoachAvailabilityQuery,
  insertScheduleBlockQuery,
  updateCoachAvailabilityQuery,
  upsertBlockScoreQuery,
} from './queries';
import dayjs from 'dayjs';
import { StudentDataMapper } from '../../datasource/student/StudentDataMapper';

export class CoachDatasource extends BaseDatasource {
  mapper: CoachDataMapper;
  scoreMapper: StudentDataMapper;
  constructor(pool: Pool) {
    super(pool);
    this.mapper = new CoachDataMapper();
    this.scoreMapper = new StudentDataMapper();
  }

  async getAvailabilityForCoach(
    coachId: string,
    startDate: string,
    endDate: string
  ): Promise<CoachAvailability[]> {
    const results = await this.execQuery(getCoachAvailibilityQuery, [
      coachId,
      dayjs(startDate).toDate(),
      dayjs(endDate).toDate(),
    ]);
    return results.map((r) => this.mapper.toCoachAvailability(r));
  }
  async getAvailabilityForCoachOverlappingWith(
    availability: CoachAvailability
  ): Promise<CoachAvailability[]> {
    const results = await this.execQuery(getCoachAvailibilityOverlappingQuery, [
      dayjs(availability.startTime).toDate(),
      dayjs(availability.endTime).toDate(),
      availability.coachId,
    ]);
    return results.map((r) => this.mapper.toCoachAvailability(r));
  }

  async insertAvailabilityForCoach(availability: CoachAvailability): Promise<void> {
    await this.execQuery(insertCoachAvailabilityQuery, [
      availability.availabilityId,
      availability.coachId,
      dayjs(availability.startTime).toDate(),
      dayjs(availability.endTime).toDate(),
    ]);
  }

  async updateAvailabilityForCoach(availability: CoachAvailability): Promise<void> {
    await this.execQuery(updateCoachAvailabilityQuery, [
      availability.availabilityId,
      dayjs(availability.startTime).toDate(),
      dayjs(availability.endTime).toDate(),
    ]);
  }

  async deleteAvailability(availabilityId: string) {
    await this.execQuery(deleteAvailabilityQuery, [availabilityId]);
  }

  async getScheduledCallsForCoach(
    coachId: string,
    startDate: string,
    endDate: string
  ): Promise<ScheduledBlock[]> {
    const results = await this.execQuery(getCoachScheduleQueries, [
      coachId,
      dayjs(startDate).toDate(),
      dayjs(endDate).toDate(),
    ]);
    return results.map((r) => this.mapper.toCoachScheduleBlock(r));
  }

  async insertScheduledBlock(block: ScheduledBlock) {
    await this.execQuery(insertScheduleBlockQuery, [
      block.blockId,
      block.coachId,
      block.studentId,
      dayjs(block.startTime).toDate(),
      dayjs(block.endTime).toDate(),
    ]);
  }

  async getScoresAssignedBy(coachId: string): Promise<CallScore[]> {
    const results = await this.execQuery(getCoachAssignedScores, [coachId]);
    return results.map((r) => ({
      block: this.mapper.toCoachScheduleBlock(r),
      score: this.scoreMapper.toStudentScore(r),
    }));
  }

  async upsertBlockScore(coachId: string, score: Score) {
    await this.execQuery(upsertBlockScoreQuery, [score.blockId, score.score, score.notes]);
  }
}
