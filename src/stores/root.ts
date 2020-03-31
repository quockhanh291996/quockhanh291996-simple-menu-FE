// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
// tslint:disable-next-line: no-implicit-dependencies
import makeInspectable from 'mobx-devtools-mst';
import { types } from 'mobx-state-tree';
import React from 'react';

import {
  CategoryStore,
  CategoryStoreInstance,
} from '~stores/category/category.store';
import { UserStore, UserStoreInstance } from '~stores/user/user.store';

export const rootStore = types.model('RootStore', {
  UserStore,
  CategoryStore,
});

const rootStoreInstance = rootStore.create({
  UserStore: UserStoreInstance,
  CategoryStore: CategoryStoreInstance,
});

if (process.env.NODE_ENV === 'development') {
  makeInspectable(rootStoreInstance);
}
export const globalRootStore = React.createContext(rootStoreInstance);
