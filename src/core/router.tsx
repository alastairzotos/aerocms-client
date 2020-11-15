import { ThemeOptions } from '@material-ui/core';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Pages } from './pages';

interface RootProps {
    store: Store;
    history: History<{}>;
    pages: Pages;
    persistor: Persistor;
}

const RouteSwitch: React.FC<{
    pages: Pages
} & RouteComponentProps> = ({
    pages,
    location
}) => (
        <Switch>
            {
                Object.keys(pages).map(url => {
                    console.log(location);
                    console.log(url);
                    console.log('--------');
                    return (
                        <Route
                            key={url}
                            path={url}
                            exact
                            component={pages[url]}
                        />
                    );
                })
            }
        </Switch>
    );

const WithRouterSwitch = withRouter(RouteSwitch);

export const Root: React.FC<RootProps> = ({
    store,
    history,
    pages,
    persistor
}) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <WithRouterSwitch pages={pages} />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
