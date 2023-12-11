import {
    ScheduleLoadingAction,
    ScheduleLoadedAction,
    ClearScheduleAction,
    AvailabilityLoadingAction,
    AvailabilityLoadedAction,
    ClearAvailabilityAction,
    CoachScoresLoadingAction,
    CoachScoresLoadedAction,
    ClearCoachScoresAction
} from '../../models/actions/coachActions';
import { CallScore, CoachAvailability, ScheduledBlock, TimeBlock } from '../../models/types';
import { BaseActionCreator } from '../BaseActionCreator';
import { CoachDatasource } from './CoachesDatasource';

class CoachActionCreator extends BaseActionCreator {
    private datasource: CoachDatasource = new CoachDatasource();

    async loadCoachSchedule(
        coachId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Array<TimeBlock>> {
        this.dispatch(this.createAction(ScheduleLoadingAction));
        const schedule = await this.datasource.loadCoachSchedule(coachId, startDate, endDate);
        this.dispatch(this.createAction(ScheduleLoadedAction, schedule));
        return schedule;
    }

    async clearCoachSchedule() {
        this.dispatch(this.createAction(ClearScheduleAction));
    }

    async loadCoachAvailability(
        coachId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Array<TimeBlock>> {
        this.dispatch(this.createAction(AvailabilityLoadingAction));
        const schedule = await this.datasource.loadCoachAvailability(coachId, startDate, endDate);
        this.dispatch(this.createAction(AvailabilityLoadedAction, schedule));
        return schedule;
    }

    async clearCoachAvailability() {
        this.dispatch(this.createAction(ClearAvailabilityAction));
    }

    async addCoachAvailability(availability: CoachAvailability) {
        await this.datasource.addCoachAvailability(availability);
        this.clearCoachAvailability();
    }

    async createBooking(booking: ScheduledBlock) {
        await this.datasource.addBooking(booking);
        this.clearCoachAvailability();
        this.clearCoachSchedule();
    }

    async loadCoachScores(coachId: string) {
        this.dispatch(this.createAction(CoachScoresLoadingAction));
        const scores = await this.datasource.loadCoachScores(coachId);
        this.dispatch(this.createAction(CoachScoresLoadedAction, scores));
    }

    async clearCoachScores() {
        this.dispatch(this.createAction(ClearCoachScoresAction));
    }

    async upsertCallScore(score: CallScore) {
        await this.datasource.upsertCoachScore(score);
        this.loadCoachScores(score.block.coachId);
    }
}

export default new CoachActionCreator();
