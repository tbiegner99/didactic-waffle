import { Store, AnyAction } from '@reduxjs/toolkit';
export class BaseActionCreator {
    private static dispatcher: Store;
    static setDispatchingStrategy(dispatcher: Store) {
        BaseActionCreator.dispatcher = dispatcher;
    }

    createAction<T>(type: string, payload?: T) {
        return { type, payload };
    }

    dispatch(action: AnyAction) {
        if (!BaseActionCreator.dispatcher) {
            throw new Error('No dispatcher was set');
        }
        BaseActionCreator.dispatcher.dispatch(action);
    }
}
