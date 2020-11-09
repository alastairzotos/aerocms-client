import * as React from 'react';

import { combineModules, CoreApp, Module } from './core';
import { authModule } from './modules/auth';

export interface IAppProps {
    modules: Module[];
}

export const App: React.FC<IAppProps> = ({ modules }) => {
    return (
        <CoreApp
            mod={
                combineModules('app', [
                    authModule,
                    ...modules
                ])
            }
        />
    );
};
