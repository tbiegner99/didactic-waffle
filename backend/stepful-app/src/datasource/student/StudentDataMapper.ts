import { Score } from '../../models/types';

export class StudentDataMapper {
  toStudentScore(r: any): Score {
    return {
      createdBy: r.coach_id,
      createdAt: r.created_date,
      notes: r.notes,
      score: r.score,
      studentId: r.student_id,
      blockId: r.block_id,
    };
  }
}
