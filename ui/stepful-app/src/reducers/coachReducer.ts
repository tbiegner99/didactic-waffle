import { AnyAction } from '@reduxjs/toolkit';
import {
    ClearScheduleAction,
    ScheduleLoadedAction,
    ScheduleLoadingAction,
    AvailabilityLoadedAction,
    AvailabilityLoadingAction,
    ClearAvailabilityAction,
    ClearCoachScoresAction,
    CoachScoresLoadingAction,
    CoachScoresLoadedAction
} from '../models/actions/coachActions';
import { CallScore, LoadedItemFactory, TimeBlock } from '../models/types';

const initialState = {
    schedule: LoadedItemFactory.unload<TimeBlock[]>(),
    availability: LoadedItemFactory.unload<TimeBlock[]>(),
    callScores: LoadedItemFactory.unload<CallScore[]>()
};

export default function coachReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case ClearScheduleAction:
            return { ...state, schedule: LoadedItemFactory.unload<TimeBlock[]>() };

        case ScheduleLoadingAction:
            return { ...state, schedule: LoadedItemFactory.loading<TimeBlock[]>() };
        case ScheduleLoadedAction:
            return {
                ...state,
                schedule: LoadedItemFactory.loaded<TimeBlock[]>(action.payload)
            };
        case ClearAvailabilityAction:
            return { ...state, availability: LoadedItemFactory.unload<TimeBlock[]>() };

        case AvailabilityLoadingAction:
            return { ...state, availability: LoadedItemFactory.loading<TimeBlock[]>() };
        case AvailabilityLoadedAction:
            return {
                ...state,
                availability: LoadedItemFactory.loaded<TimeBlock[]>(action.payload)
            };
        case ClearCoachScoresAction:
            return { ...state, callScores: LoadedItemFactory.unload<CallScore[]>() };

        case CoachScoresLoadingAction:
            return { ...state, callScores: LoadedItemFactory.loading<CallScore[]>() };
        case CoachScoresLoadedAction:
            return {
                ...state,
                callScores: LoadedItemFactory.loaded<CallScore[]>(action.payload)
            };
    }
    return state;
}
