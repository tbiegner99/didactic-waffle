import { combineReducers } from 'redux';
import coachReducer from './coachReducer';
import studentReducer from './studentReducer';

export default combineReducers({
    coach: coachReducer,
    student: studentReducer
});
