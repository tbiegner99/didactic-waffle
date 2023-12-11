import { AnyAction } from '@reduxjs/toolkit';
import {
    ClearStudentScoresAction,
    StudentScoresLoadedAction,
    StudentScoresLoadingAction
} from '../models/actions/studentActions';
import { CallScore, LoadedItemFactory, TimeBlock } from '../models/types';

const initialState = {
    myScores: LoadedItemFactory.unload<CallScore[]>()
};

export default function studentReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case ClearStudentScoresAction:
            return { ...state, myScores: LoadedItemFactory.unload<CallScore[]>() };

        case StudentScoresLoadingAction:
            return { ...state, myScores: LoadedItemFactory.loading<CallScore[]>() };
        case StudentScoresLoadedAction:
            return {
                ...state,
                myScores: LoadedItemFactory.loaded<CallScore[]>(action.payload)
            };
    }
    return state;
}
