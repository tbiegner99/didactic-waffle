import { connect } from 'react-redux';
import CoachesActionCreator from '../../../actionCreators/coaches/CoachesActionCreator';
import { StudentSchedulePage } from './StudentSchedulePage';
import { ScheduledBlock, TimeBlock } from '../../../models/types';

const mapStateToProps = (state: any) => ({
    schedule: state.coach.schedule,
    availability: state.coach.availability
});

const mapDispatchToProps = () => ({
    onAddBooking: async (block: ScheduledBlock) => {
        await CoachesActionCreator.createBooking(block);
    },
    onLoad: (studentId: string, startDate: Date, endDate: Date, coachId?: string) => {
        if (coachId) {
            CoachesActionCreator.loadCoachSchedule(coachId, startDate, endDate);
            CoachesActionCreator.loadCoachAvailability(coachId, startDate, endDate);
        }
    },
    onUnload: () => {
        CoachesActionCreator.clearCoachSchedule();
        CoachesActionCreator.clearCoachAvailability();
    }
});

export const ReduxStudentSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentSchedulePage);
