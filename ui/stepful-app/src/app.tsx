import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/rootReducer';
import App from './pages/App';
import { ViewportContextProvider } from './context/ViewportContext';
import { Provider } from 'react-redux';
import { BaseActionCreator } from './actionCreators/BaseActionCreator';

declare global {
    interface Window {
        Environment: any;
    }
}

const store = configureStore({ reducer: rootReducer });
BaseActionCreator.setDispatchingStrategy(store);

export function Main(props: any) {
    return (
        <Provider store={store}>
            <ViewportContextProvider>
                <App {...props} />
            </ViewportContextProvider>
        </Provider>
    );
}
ReactDOM.render(<Main />, document.getElementsByTagName('body')[0]);
