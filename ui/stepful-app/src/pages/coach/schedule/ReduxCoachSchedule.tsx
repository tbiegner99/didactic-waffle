import { connect } from 'react-redux';
import CoachesActionCreator from '../../../actionCreators/coaches/CoachesActionCreator';
import { CoachSchedulePage } from './CoachSchedulePage';

const mapStateToProps = (state: any) => ({
    schedule: state.coach.schedule
});

const mapDispatchToProps = () => ({
    onLoad: (coachId: string, startDate: Date, endDate: Date) => {
        CoachesActionCreator.loadCoachSchedule(coachId, startDate, endDate);
    },
    onUnload: () => {
        CoachesActionCreator.clearCoachSchedule();
    }
});

export const ReduxCoachSchedule = connect(mapStateToProps, mapDispatchToProps)(CoachSchedulePage);
