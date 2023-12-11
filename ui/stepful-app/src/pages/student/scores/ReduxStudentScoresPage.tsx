import { connect } from 'react-redux';
import { StudentScores } from './StudentScoresPage';
import StudentActionCreator from '../../../actionCreators/students/StudentActionCreator';

const mapStateToProps = (state: any) => ({
    scores: state.student.myScores
});

const mapDispatchToProps = () => ({
    onLoad: (studentId: string) => {
        StudentActionCreator.loadStudentScores(studentId);
    },
    onUnload: () => {
        StudentActionCreator.clearStudentScores();
    }
});

export const ReduxStudentScoresPage = connect(mapStateToProps, mapDispatchToProps)(StudentScores);
