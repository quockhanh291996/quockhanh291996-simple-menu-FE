import { cast, flow, Instance, types } from 'mobx-state-tree';
import { UserService } from '~services/features/user.service';
import { APIResponse } from '~services/http-request/api-response.service';
import { IUserInfo, USER_STATE, UserInfo } from './user.info';

export const UserStore = types
  .model({
    UserInfo,
    token: '',
    userState: types.optional(
      types.enumeration('userState', Object.values(USER_STATE)),
      USER_STATE.LOGIN_NOT_LOGIN,
    ),
    message: '',
  })
  .actions((self) => {
    const actions = {
      setUser(inputUserInfo: IUserInfo, token: string): void {
        self.UserInfo = inputUserInfo;
        self.token = token;
      },

      login: flow(function* pLogin(params?: any): any {
        try {
          self.userState = USER_STATE.LOGIN_WAITING;
          const { data }: APIResponse = yield UserService.login(params);

          // if login sucessfully, set state and set store
          self.userState = USER_STATE.LOGIN_SUCCESS;
          actions.setUser(cast(data.user), data.access);
        } catch (error) {
          self.userState = USER_STATE.LOGIN_FAILED;
          self.message = error.message;
        }
      }),
    };

    return actions;
  });

export type IUserStore = Instance<typeof UserStore>;

export const UserStoreInstance = UserStore.create({
  UserInfo: UserInfo.create(),
  token: '',
});
