import { api } from '@/api';
import { OAuthType } from '@app2/common/types';
import { ReactElement, useState } from 'react';

export const useOAuth = () => {
  const [ errors, setErrors ] = useState<ReactElement>();

  const callOAuth = async (type: OAuthType, accessToken: string) => {
    if (!accessToken) {
      console.log('no access token provided');
      return;
    }

    const res = await api.post('/api/oauth/callback', {}, {
      params: {
        type: type,
        access_token: accessToken,
      },
      withCredentials: true,
    }).catch((error) => {
      const message = error?.response?.data?.message ?? error.message;
      let err: string[] = [];
      if (message instanceof Array) {
        err = message;
      }
      else {
        err = [ message ];
      }
      const renderedErrors = err.map((error, index) => {
        return <li key={index}>{error}</li>;
      });

      setErrors(
        <div className='alert alert-danger'>
          <h4>Ooops...</h4>
          <ul>
            {renderedErrors}
          </ul>
        </div>
      );

      return null;
    });

    return res?.data;
  }

  return {
    callOAuth,
    errors,
  };
}