import { Instance, types } from 'mobx-state-tree';

export const CATEGORY_STATE = {
  IDLE: 'idle',
  //
  FETCH_CATEGORY_SUCCESS: 'fetch_success',
  FETCH_CATEGORY_FAILED: 'fetch_failed',
  WAITING_FETCH_CATEGORY: 'waiting_fetch',
  //
  ADD_CATEGORY_SUCCESS: 'add_success',
  ADD_CATEGORY_FAILED: 'add_failed',
  WAITING_ADD_CATEGORY: 'waiting_add',
  //
  DELELE_CATEGORY_SUCCESS: 'delete_success',
  DELELE_CATEGORY_FAILED: 'delete_failed',
  WAITING_DELELE_CATEGORY: 'waiting_delete',
};

export const Category = types.model({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
});

export type ICategory = Instance<typeof Category>;
