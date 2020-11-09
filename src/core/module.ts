import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { Pages } from './pages';

export interface Module {
    name: string;
    pages?: Pages;
    reducer?: Reducer;
    effect?: Epic;
}

export const combineModules = (name: string, modules: Module[]): Module => ({
    name,

    pages: (
        modules
            .filter(mod => !!mod.pages)
            .reduce((allPages, mod) => ({
                ...allPages,
                ...(Object.keys(mod.pages).reduce((modulePages, url) => ({
                    ...modulePages,
                    [url]: mod.pages[url]
                }), {}))
            }), {})
    ),

    reducer: combineReducers(
        modules
            .filter(mod => !!mod.reducer)
            .reduce((reducers, mod) => ({
                ...reducers,
                [mod.name]: mod.reducer
            }), {})
    ),

    effect: combineEpics(
        ...modules
            .filter(mod => !!mod.effect)
            .map(mod => mod.effect)
    )
});
