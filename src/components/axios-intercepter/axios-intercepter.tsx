import { AxiosRequestConfig } from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { axios } from '~services/http-request/axios';

export const Interceptor: React.FC<{ token: string }> = observer((props) => {
  const { token } = props;
  const [] = useState();
  const [authIterceptor, setAuthIterceptor] = useState<number | undefined>();

  const addRequestInterceptor = () => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log(2);
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
    if (token.length !== 0) {
      addRequestInterceptor();
    }
    return () => {
      removeRequestInterceptor();
    };
  }, [token]);

  // tslint:disable-next-line: no-null-keyword
  return null;
});
