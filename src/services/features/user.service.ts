import { APIHandler } from '~services/http-request/api-response.service';

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

  const pLogin = async (params?: any) =>
    APIHandler.post(USER_ENDPOINT.LOGIN, params);

  const pGetUserRoles = async () => APIHandler.get(USER_ENDPOINT.ROLE);

  return {
    register: pRegister,
    login: pLogin,
    getUserRoles: pGetUserRoles,
  };
})();
