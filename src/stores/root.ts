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
import { ItemStore, ItemStoreInstance } from '~stores/item/item.store';
import { UserStore, UserStoreInstance } from '~stores/user/user.store';
import {
  GlobalDialogStore,
  GlobalDialogStoreInstance,
} from './global-dialog.store';

export const rootStore = types.model('RootStore', {
  UserStore,
  ItemStore,
  CategoryStore,
  GlobalDialogStore,
});

const rootStoreInstance = rootStore.create({
  UserStore: UserStoreInstance,
  ItemStore: ItemStoreInstance,
  CategoryStore: CategoryStoreInstance,
  GlobalDialogStore: GlobalDialogStoreInstance,
});

if (process.env.NODE_ENV === 'development') {
  makeInspectable(rootStoreInstance);
}
export const globalRootStore = React.createContext(rootStoreInstance);
