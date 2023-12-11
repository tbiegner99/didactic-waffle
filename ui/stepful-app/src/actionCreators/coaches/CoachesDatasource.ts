import { CallScore, CoachAvailability, ScheduledBlock, TimeBlock } from '../../models/types';
import BaseDatasource from '../BaseDatasource';
import { CoachMapper } from './CoachesMapper';
import dayjs from 'dayjs';

export class CoachDatasource extends BaseDatasource {
    private mapper: CoachMapper = new CoachMapper();

    async loadCoachSchedule(
        coachId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Array<TimeBlock>> {
        var response = await this.client.get(this.constructUrl(`/coach/${coachId}/schedule`), {
            params: {
                startDate: dayjs(startDate).toISOString(),
                endDate: dayjs(endDate).toISOString()
            }
        });

        return response.data.map((item: any) => this.mapper.fromBlockResponse(item));
    }

    async loadCoachAvailability(
        coachId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Array<TimeBlock>> {
        var response = await this.client.get(this.constructUrl(`/coach/${coachId}/availability`), {
            params: {
                startDate: dayjs(startDate).toISOString(),
                endDate: dayjs(endDate).toISOString()
            }
        });

        return response.data.map((item: any) => this.mapper.fromBlockResponse(item));
    }

    async addCoachAvailability(availability: CoachAvailability) {
        await this.client.post(
            this.constructUrl(`/coach/${availability.coachId}/availability`),
            availability
        );
    }

    async addBooking(block: ScheduledBlock) {
        await this.client.post(this.constructUrl(`/coach/${block.coachId}/schedule`), block);
    }

    async upsertCoachScore(score: CallScore) {
        await this.client.put(
            this.constructUrl(`/coach/${score.block.coachId}/block/${score.block.blockId}/score`),
            score.score
        );
    }

    async loadCoachScores(coachId: string): Promise<CallScore[]> {
        var response = await this.client.get(this.constructUrl(`/coach/${coachId}/score`));

        return response.data.map((item: any) => this.mapper.fromCallScoreResponse(item));
    }
}
