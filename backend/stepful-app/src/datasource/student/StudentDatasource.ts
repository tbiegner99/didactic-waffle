import { CallScore, Score } from '../../models/types';
import { Pool } from 'postgresql-client';
import { StudentDataMapper } from './StudentDataMapper';
import { BaseDatasource } from '../BaseDatasource';
import { CoachDataMapper } from '../../datasource/coach/CoachDataMapper';
import { getScoresForStudentQuery } from './queries';

export class StudentDatasource extends BaseDatasource {
  mapper: StudentDataMapper;
  coachMapper: CoachDataMapper;
  constructor(pool: Pool) {
    super(pool);
    this.mapper = new StudentDataMapper();
    this.coachMapper = new CoachDataMapper();
  }

  async getScoresForStudent(studentId: string): Promise<CallScore[]> {
    const results = await this.execQuery(getScoresForStudentQuery, [studentId]);
    return results.map((r) => ({
      block: this.coachMapper.toCoachScheduleBlock(r),
      score: this.mapper.toStudentScore(r),
    }));
  }
}
