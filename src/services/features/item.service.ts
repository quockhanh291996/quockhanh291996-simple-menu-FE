import { APIHandler } from '~services/http-request/api-response.service';

// List endpoint to get data related to item
const ITEM_ENDPOINT = {
  ALL: '/items/',
  DETAIL: (itemID: number) => `/items/${itemID}`,
};

// Export the service to interact with data
export const ItemService = (() => {
  /** For demo, jsut getAll withou pagination */
  const pFetchAll = async () => APIHandler.getAll(ITEM_ENDPOINT.ALL);

  //TODO: should pass parameter through function, not by string
  const pFetchAllByCategory = async (categoryID: number) =>
    APIHandler.getAll(`${ITEM_ENDPOINT.ALL}?categoryID=${categoryID}`);

  const pCreateNew = async (param?: any) =>
    APIHandler.post(ITEM_ENDPOINT.ALL, param);

  const pUpdateNew = async (categoryID: number, param?: any) =>
    APIHandler.post(ITEM_ENDPOINT.DETAIL(categoryID), param);

  const pDel = async (categoryID: number) =>
    APIHandler.del(ITEM_ENDPOINT.DETAIL(categoryID));

  return {
    fetchAll: pFetchAll,
    fetchAllByCategory: pFetchAllByCategory,
    create: pCreateNew,
    update: pUpdateNew,
    del: pDel,
  };
})();
