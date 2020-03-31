import { AxiosResponse } from 'axios';
import { axios } from '~services/http-request/axios';

/** interface that contain the response from API */
export interface APIResponse {
  statusCode: number;
  status: 'success' | 'error';
  data?: any;
  message?: string;
}

/** Module to generate the API's response to the APIResponse interface */
export const ApiResponseHandler = (() => {
  const pGenSuccessResponse = (res: AxiosResponse): APIResponse => ({
    statusCode: res.status,
    status: 'success',
    data: res && res.data ? res.data : res,
    message: '',
  });

  const pGenErrorResponse = (error: any): APIResponse => ({
    statusCode: error.response?.status ?? error.status,
    status: 'error',
    //TODO: Need implement the function to generate all message from server
    message: error.response?.data?.message ?? error.message,
  });

  return {
    genSuccessResponse: pGenSuccessResponse,
    genErrorResponse: pGenErrorResponse,
  };
})();

/** Module to expose method to interact with DB */
export const APIHandler = (() => {
  const runInHandleError = async (func: () => Promise<any>) => {
    try {
      const res = await func();
      return ApiResponseHandler.genSuccessResponse(res);
    } catch (e) {
      throw ApiResponseHandler.genErrorResponse(e.response);
    }
  };

  /* Get all without pagination */
  const pGetAll = async (url: string): Promise<any> => {
    try {
      const response = await runInHandleError(() => axios.get(url));
      if (response.data.next) {
        return {
          ...response,
          data: [
            ...response.data.results,
            ...(await pGetAll(response.data.next)).data,
          ],
        };
      }
      return {
        ...response,
        data: [...response.data.results],
      };
    } catch (e) {
      throw e;
    }
  };

  const pGet = async (url: string) => runInHandleError(() => axios.get(url));

  const pPost = async (url: string, data: any) =>
    runInHandleError(() => axios.post(url, data));

  const pPut = async (url: string, data: any) =>
    runInHandleError(() => axios.put(url, data));

  const pPatch = async (url: string, data: any) =>
    runInHandleError(() => axios.patch(url, data));

  const pDel = async (url: string) => runInHandleError(() => axios.delete(url));

  return {
    getAll: pGetAll,
    get: pGet,
    post: pPost,
    put: pPut,
    patch: pPatch,
    del: pDel,
  };
})();
