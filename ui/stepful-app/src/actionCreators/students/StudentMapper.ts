import { Score, TimeBlock } from '../../models/types';

export class StudentMapper {
    fromCallScoreResponse(item: any) {
        return {
            block: this.fromBlockResponse(item.block),
            score: this.fromScoreResponse(item.score)
        };
    }

    fromScoreResponse(data: any): Score {
        return data as Score;
    }

    fromBlockResponse(data: any): TimeBlock {
        return data as TimeBlock;
    }
}
