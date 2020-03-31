import { AxiosRequestConfig } from 'axios';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { axios } from '~services/http-request/axios';
import { StorageService } from '~services/storage/storage';
import { globalRootStore } from '~stores/root';

export const Interceptor: React.FC = observer(() => {
  const [authIterceptor, setAuthIterceptor] = useState<number | undefined>();
  const {
    UserStore: { logout },
  } = useContext(globalRootStore);

  const addRequestInterceptor = () => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = StorageService.get('token');
        config.headers.authorization = `Bearer ${token}`;

        return config;
      },
      (e: any) => {
        Promise.reject(e);
      },
    );

    axios.interceptors.response.use(undefined, (e: any) => {
      /**
       * NOTE: This is the temporary solution for demo, show all error when request api
       * */
      if (e.response.status === 401) {
        // Invalid token
        logout();
      } else {
        const keys = Object.keys(e.response.data);
        if (keys.length > 0) {
          alert(e.response.data[keys[0]]);
        } else {
          alert(e.response);
        }
      }
      Promise.reject(e);
    });

    setAuthIterceptor(requestInterceptor);
  };

  const removeRequestInterceptor = () => {
    if (authIterceptor) {
      axios.interceptors.request.eject(authIterceptor);
    }
    setAuthIterceptor(undefined);
  };

  useEffect(() => {
    addRequestInterceptor();

    return () => {
      removeRequestInterceptor();
    };
  }, []);

  // tslint:disable-next-line: no-null-keyword
  return null;
});
