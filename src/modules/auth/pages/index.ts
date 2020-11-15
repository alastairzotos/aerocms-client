import loadable from '@loadable/component';
import { Pages } from '~/core';

import LoginPage from './LoginPage';

export const pages: Pages = {
    '/aero-login': loadable(async () => import('./LoginPage'))
};
