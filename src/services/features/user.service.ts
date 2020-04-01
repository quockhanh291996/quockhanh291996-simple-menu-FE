import {
  APIHandler,
  APIResponse,
} from '~services/http-request/api-response.service';
import { StorageService } from '~services/storage/storage';

// List endpoint to get data related to user
const USER_ENDPOINT = {
  REGISTER: '/users/',
  LOGIN: '/token/',
  //
  ROLE: '/roles/',
};

// Export the service to interact with data
export const UserService = (() => {
  const pRegister = async (params?: any) =>
    APIHandler.post(USER_ENDPOINT.REGISTER, params);

  const pLogin = async (params?: any) => {
    try {
      const result: APIResponse = await APIHandler.post(
        USER_ENDPOINT.LOGIN,
        params,
      );

      /** Save token to storage */
      StorageService.set('user', JSON.stringify(result.data.user));
      StorageService.set('token', result.data.access);

      return result;
    } catch (e) {
      throw e;
    }
  };

  const pLogout = () => {
    StorageService.remove('user');
    StorageService.remove('token');
  };

  const pGetUserRoles = async () => APIHandler.getAll(USER_ENDPOINT.ROLE);

  return {
    login: pLogin,
    logout: pLogout,
    register: pRegister,
    getUserRoles: pGetUserRoles,
  };
})();
