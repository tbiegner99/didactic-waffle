import { CallScore } from '../../models/types';
import BaseDatasource from '../BaseDatasource';
import { StudentMapper } from './StudentMapper';

export class StudentDatasource extends BaseDatasource {
    private mapper: StudentMapper = new StudentMapper();

    async loadStudentScores(studentId: string): Promise<CallScore[]> {
        var response = await this.client.get(this.constructUrl(`/student/${studentId}/score`));

        return response.data.map((item: any) => this.mapper.fromCallScoreResponse(item));
    }
}
