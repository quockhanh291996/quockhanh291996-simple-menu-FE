import { cast, flow, Instance, types } from 'mobx-state-tree';

import { CategoryService } from '~services/features/category.service';
import { APIResponse } from '~services/http-request/api-response.service';
import { Category, CATEGORY_STATE } from './category.info';

export const CategoryStore = types
  .model({
    categoryList: types.array(Category),
    state: types.optional(
      types.enumeration('userState', Object.values(CATEGORY_STATE)),
      CATEGORY_STATE.IDLE,
    ),
    message: '',
  })
  .actions((self) => {
    const actions = {
      fetchAll: flow(function* pLogin(): any {
        try {
          self.state = CATEGORY_STATE.WAITING_FETCH_CATEGORY;
          const { data }: APIResponse = yield CategoryService.fetchAll();
          self.categoryList = cast(data)
          self.state = CATEGORY_STATE.FETCH_CATEGORY_SUCCESS;
        } catch (error) {
          self.state = CATEGORY_STATE.FETCH_CATEGORY_FAILED;
          self.message = error.message;
        }
      }),

      create: flow(function* pCreate(params?: any): any {
        try {
          self.state = CATEGORY_STATE.WAITING_ADD_CATEGORY;
          yield CategoryService.create(params);
          self.state = CATEGORY_STATE.ADD_CATEGORY_SUCCESS;
        } catch (error) {
          self.state = CATEGORY_STATE.ADD_CATEGORY_FAILED;
          self.message = error.message;
        }
      }),

      delete: flow(function* pCreate(categoryID: number): any {
        try {
          self.state = CATEGORY_STATE.WAITING_DELELE_CATEGORY;
          yield CategoryService.del(categoryID);
          self.state = CATEGORY_STATE.DELELE_CATEGORY_SUCCESS;
        } catch (error) {
          self.state = CATEGORY_STATE.DELELE_CATEGORY_FAILED;
          self.message = error.message;
        }
      }),
    };

    return actions;
  });

export type ICategoryStore = Instance<typeof CategoryStore>;

export const CategoryStoreInstance = CategoryStore.create({
  categoryList: [],
});
