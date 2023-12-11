import { Request, Response } from 'express';
import { StudentService } from '../service/StudentService';
import { HTTPStatus } from '../utils/constants';

export class StudentController {
  constructor(private service: StudentService) {}

  async getScores(req: Request, res: Response) {
    const { studentId } = req.params;
    const results = await this.service.getScoresForStudentQuery(studentId);
    res.send(results);
    res.status(HTTPStatus.OK);
  }
}
