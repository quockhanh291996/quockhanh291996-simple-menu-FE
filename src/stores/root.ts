// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import makeInspectable from 'mobx-devtools-mst';
import { types } from 'mobx-state-tree';
import React from 'react';

export const rootStore = types.model('RootStore', {});

const rootStoreInstance = rootStore.create({});

if (process.env.NODE_ENV === 'development') {
  makeInspectable(rootStoreInstance);
}
export const globalRootStore = React.createContext(rootStoreInstance);
