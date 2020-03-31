import { APIHandler } from '~services/http-request/api-response.service';

// List endpoint to get data related to user
const CATEGORY_ENDPOINT = {
  ALL: '/categories/',
  DETAIL: (categoryID: number) => `/categories/${categoryID}`,
};

// Export the service to interact with data
export const CategoryService = (() => {
  /** For demo, jsut getAll withou pagination */
  const pFetchAll = async () => APIHandler.getAll(CATEGORY_ENDPOINT.ALL);

  const pcreateNew = async (param?: any) =>
    APIHandler.post(CATEGORY_ENDPOINT.ALL, param);

  const pDel = async (categoryID: number) =>
    APIHandler.del(CATEGORY_ENDPOINT.DETAIL(categoryID));

  return {
    fetchAll: pFetchAll,
    create: pcreateNew,
    del: pDel,
  };
})();
