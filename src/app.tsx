import { App as CoreApp, Module } from '@aerocms/client-core';
import * as React from 'react';

import { authModule } from './modules/auth';

export interface IAppProps {
    modules?: Module[];
}

export const App: React.FC<IAppProps> = ({ modules }) => {
    return (
        <CoreApp
            modules={[
                authModule,
                ...(modules ? modules : [])
            ]}
        />
    );
};
