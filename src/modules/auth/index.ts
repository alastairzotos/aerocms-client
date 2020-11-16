import { Module } from '@aerocms/client-core';

import { pages } from './pages';

export const authModule: Module = {
    name: 'auth',
    pages,
    reducer: (state = {}) => state
};
