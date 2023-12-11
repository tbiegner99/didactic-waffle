import { StudentDatasource } from '../datasource/student/StudentDatasource';
import { getScoresForStudentQuery } from '../datasource/student/queries';

export class StudentService {
  constructor(private datasource: StudentDatasource) {}

  getScoresForStudentQuery(studentId: string) {
    return this.datasource.getScoresForStudent(studentId);
  }
}
