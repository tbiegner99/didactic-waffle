import { connect } from 'react-redux';
import { CoachAvailabilityPage } from './CoachAvailabilityPage';
import CoachesActionCreator from '../../../actionCreators/coaches/CoachesActionCreator';
import { CoachAvailability } from '../../../models/types';

const mapStateToProps = (state: any) => ({
    availability: state.coach.availability
});

const mapDispatchToProps = () => ({
    onLoad: (coachId: string, startDate: Date, endDate: Date) => {
        CoachesActionCreator.loadCoachAvailability(coachId, startDate, endDate);
    },
    onUnload: () => {
        CoachesActionCreator.clearCoachAvailability();
    },

    onAddAvailability: (availability: CoachAvailability) => {
        CoachesActionCreator.addCoachAvailability(availability);
    }
});

export const ReduxCoachAvailability = connect(
    mapStateToProps,
    mapDispatchToProps
)(CoachAvailabilityPage);
