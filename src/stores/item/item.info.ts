import { Instance, types } from 'mobx-state-tree';

export const ITEM_STATE = {
  IDLE: 'idle',
  //
  FETCH_BY_CATEGORY_SUCCESS: 'fetch_by_category_success',
  FETCH_BY_CATEGORY_FAILED: 'fetch_by_category_failed',
  WAITING_FETCH_BY_CATEGORY: 'waiting_by_category_fetch',
  //
  FETCH_ITEM_SUCCESS: 'fetch_success',
  FETCH_ITEM_FAILED: 'fetch_failed',
  WAITING_FETCH_ITEM: 'waiting_fetch',
  //
  FETCH_DETAIL_ITEM_SUCCESS: 'fetch_detail_success',
  FETCH_DETAIL_ITEM_FAILED: 'fetch_detail_failed',
  WAITING_FETCH_DETAIL_ITEM: 'waiting_detail_fetch',
  //
  ADD_ITEM_SUCCESS: 'add_success',
  ADD_ITEM_FAILED: 'add_failed',
  WAITING_ADD_ITEM: 'waiting_add',
  //
  UPDATE_ITEM_SUCCESS: 'update_success',
  UPDATE_ITEM_FAILED: 'update_failed',
  WAITING_UPDATE_ITEM: 'waiting_update',
  //
  DELELE_ITEM_SUCCESS: 'delete_success',
  DELELE_ITEM_FAILED: 'delete_failed',
  WAITING_DELELE_ITEM: 'waiting_delete',
};

export const Item = types.model({
  id: types.optional(types.number, 0),
  name: types.optional(types.string, ''),
  description: types.optional(types.string, ''),
  thumbnail_image: types.optional(types.string, ''),
});

export type IItem = Instance<typeof Item>;
