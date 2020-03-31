import _ from 'lodash';
import { cast, flow, Instance, types } from 'mobx-state-tree';

import { ItemService } from '~services/features/item.service';
import { APIResponse } from '~services/http-request/api-response.service';
import { Item, ITEM_STATE } from './item.info';

export const ItemStore = types
  .model({
    itemList: types.array(Item),
    currentItem: types.maybe(Item),
    state: types.optional(
      types.enumeration('userState', Object.values(ITEM_STATE)),
      ITEM_STATE.IDLE,
    ),
    message: '',
  })
  .actions((self) => {
    const actions = {
      fetchAllByCategory: flow(function* pFetchAllByCategory(
        categoryID: number,
      ): any {
        try {
          self.state = ITEM_STATE.WAITING_FETCH_BY_CATEGORY;
          const { data }: APIResponse = yield ItemService.fetchAllByCategory(
            categoryID,
            );
          self.itemList = cast(data);
          self.state = ITEM_STATE.FETCH_BY_CATEGORY_SUCCESS;
        } catch (error) {
          self.state = ITEM_STATE.FETCH_BY_CATEGORY_FAILED;
          self.message = error.message;
        }
      }),

      create: flow(function* pCreate(params?: any): any {
        try {
          self.state = ITEM_STATE.WAITING_ADD_ITEM;
          yield ItemService.create(params);
          self.state = ITEM_STATE.ADD_ITEM_SUCCESS;
        } catch (error) {
          self.state = ITEM_STATE.ADD_ITEM_FAILED;
          self.message = error.message;
        }
      }),

      update: flow(function* pUpdate(categoryID: number, params?: any): any {
        try {
          self.state = ITEM_STATE.WAITING_UPDATE_ITEM;
          yield ItemService.update(categoryID, params);
          self.state = ITEM_STATE.UPDATE_ITEM_SUCCESS;
        } catch (error) {
          self.state = ITEM_STATE.UPDATE_ITEM_FAILED;
          self.message = error.message;
        }
      }),

      delete: flow(function* pDelete(categoryID: number): any {
        try {
          self.state = ITEM_STATE.WAITING_DELELE_ITEM;
          yield ItemService.del(categoryID);
          self.state = ITEM_STATE.DELELE_ITEM_SUCCESS;
        } catch (error) {
          self.state = ITEM_STATE.DELELE_ITEM_FAILED;
          self.message = error.message;
        }
      }),

      reset: () => {
        self.itemList = cast([]);
        self.state = ITEM_STATE.IDLE;
        self.message = '';
      },
    };

    return actions;
  });

export type IItemStore = Instance<typeof ItemStore>;

export const ItemStoreInstance = ItemStore.create({
  itemList: [],
});
