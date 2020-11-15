import { ThemeOptions } from '@material-ui/core';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { Store } from 'redux';

import { Pages } from './pages';

interface RootProps {
    store: Store;
    history: History<{}>;
    pages: Pages;
}

const RouteSwitch: React.FC<{
    pages: Pages
} & RouteComponentProps> = ({
    pages
}) => {
        return (
            <Switch>
                {
                    Object.keys(pages).map(url => {
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
    };

const WithRouterSwitch = withRouter(RouteSwitch);

export const Root: React.FC<RootProps> = ({
    store,
    history,
    pages
}) => (
        <Provider store={store}>
            <BrowserRouter>
                <WithRouterSwitch pages={pages} />
            </BrowserRouter>
        </Provider>
    );
