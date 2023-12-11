import { connect } from 'react-redux';
import { CoachScoresPage } from './CoachScoresPage';
import CoachesActionCreator from '../../../actionCreators/coaches/CoachesActionCreator';
import { CallScore } from '../../../models/types';

const mapStateToProps = (state: any) => ({
    callScores: state.coach.callScores
});

const mapDispatchToProps = () => ({
    onLoad: (coachId: string) => {
        CoachesActionCreator.loadCoachScores(coachId);
    },
    onUnload: () => {
        CoachesActionCreator.clearCoachScores();
    },

    onEditScore: (score: CallScore) => {
        CoachesActionCreator.upsertCallScore(score);
    }
});

export const ReduxCoachScoresPage = connect(mapStateToProps, mapDispatchToProps)(CoachScoresPage);
