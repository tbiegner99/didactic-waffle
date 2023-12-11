import {
    ClearStudentScoresAction,
    StudentScoresLoadedAction,
    StudentScoresLoadingAction
} from '../../models/actions/studentActions';
import { BaseActionCreator } from '../BaseActionCreator';
import { StudentDatasource } from './StudentDatasource';

class StudentActionCreator extends BaseActionCreator {
    private datasource: StudentDatasource = new StudentDatasource();

    async loadStudentScores(studentId: string) {
        this.dispatch(this.createAction(StudentScoresLoadingAction));
        const scores = await this.datasource.loadStudentScores(studentId);
        this.dispatch(this.createAction(StudentScoresLoadedAction, scores));
    }

    clearStudentScores() {
        this.dispatch(this.createAction(ClearStudentScoresAction));
    }
}

export default new StudentActionCreator();
