import { Pages } from '@aerocms/client-core';
import loadable from '@loadable/component';

import LoginPage from './LoginPage';

export const pages: Pages = {
    '/aero-login': loadable(async () => import('./LoginPage'))
};
