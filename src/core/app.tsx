import { createBrowserHistory } from 'history';
import * as React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { Module } from './module';
import { Root } from './router';

export interface ICoreAppProps {
    mod: Module;
}

export const CoreApp: React.FC<ICoreAppProps> = ({ mod }) => {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        mod.reducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware
            )
        ),
    );

    epicMiddleware.run(mod.effect);

    return (
        <>
            <Root
                store={store}
                history={createBrowserHistory()}
                pages={mod.pages}
            />
        </>
    );
};
