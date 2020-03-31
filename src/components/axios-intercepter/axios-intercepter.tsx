import { AxiosRequestConfig } from 'axios';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { axios } from '~services/http-request/axios';
import { globalRootStore } from '~stores/root';

export const Interceptor = observer(() => {
  const {
    UserStore: { token },
  } = useContext(globalRootStore);
  const [authIterceptor, setAuthIterceptor] = useState<number | undefined>();

  const addRequestInterceptor = () => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers.authorization = `Bearer ${token}`;

        return config;
      },
      (e: any) => Promise.reject(e),
    );
    setAuthIterceptor(requestInterceptor);
  };

  const removeRequestInterceptor = () => {
    if (authIterceptor) {
      axios.interceptors.request.eject(authIterceptor);
    }
    setAuthIterceptor(undefined);
  };

  useEffect(() => {
    if (token) {
      addRequestInterceptor();
    }
  }, [token]);

  useEffect(
    () => () => {
      removeRequestInterceptor();
    },
    [],
  );

  // tslint:disable-next-line: no-null-keyword
  return null;
});
