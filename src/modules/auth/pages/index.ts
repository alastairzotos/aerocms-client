import loadable from '@loadable/component';
import { Pages } from '~/core';

export const pages: Pages = {
    '/aero-login': loadable(async () => import('./LoginPage'))
};
