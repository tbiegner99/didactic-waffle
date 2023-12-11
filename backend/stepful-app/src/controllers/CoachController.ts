import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { CoachService } from '../service/CoachService';
import { HTTPStatus } from '../utils/constants';
import { CoachAvailability, ScheduledBlock, Score } from '../models/types';
import { getCoachScheduleQueries } from '../datasource/coach/queries';

export class CoachController {
  constructor(private service: CoachService) {}

  async getAvailableTimes(req: Request, res: Response) {
    const { coachId } = req.params;
    let { startDate, endDate } = req.query;

    if (!startDate) {
      startDate = dayjs().startOf('day').toISOString();
    } else {
      startDate = dayjs(startDate.toString()).startOf('day').toISOString();
    }
    if (!endDate) {
      endDate = dayjs().endOf('day').add(7, 'days').toISOString();
    } else {
      endDate = dayjs(endDate.toString()).endOf('day').toISOString();
    }
    const result = await this.service.getAvailableTimes(coachId, startDate, endDate);
    res.send(result);
    res.status(HTTPStatus.OK);
  }

  async addAvailability(req: Request, res: Response) {
    await this.service.addAvailibility(req.body as CoachAvailability);
    res.send();
    res.status(HTTPStatus.NO_CONTENT);
  }

  async getUpcomingCalls(req: Request, res: Response) {
    const { coachId } = req.params;
    let { startDate, endDate } = req.query;
    if (!startDate) {
      startDate = dayjs().startOf('day').toISOString();
    } else {
      startDate = dayjs(startDate.toString()).startOf('day').toISOString();
    }
    if (!endDate) {
      endDate = dayjs(startDate).endOf('day').add(7, 'days').toISOString();
    } else {
      endDate = dayjs(endDate.toString()).endOf('day').toISOString();
    }
    const results = await this.service.getUpComingCalls(coachId, startDate, endDate);
    res.send(results);
    res.status(HTTPStatus.NO_CONTENT);
  }

  async scheduleUpcomingCall(req: Request, res: Response) {
    const { coachId } = req.params;

    await this.service.scheduleUpcomingCall(coachId, req.body as ScheduledBlock);
    res.send();
    res.status(HTTPStatus.NO_CONTENT);
  }

  async getAssignedScores(req: Request, res: Response) {
    const { coachId } = req.params;

    const results = await this.service.getScoresAssignedBy(coachId);
    res.send(results);
    res.status(HTTPStatus.OK);
  }

  async upsertBlockScore(req: Request, res: Response) {
    const { coachId, blockId } = req.params;

    const results = await this.service.upsertBlockScore(coachId, blockId, req.body as Score);
    res.send(results);
    res.status(HTTPStatus.NO_CONTENT);
  }
}
