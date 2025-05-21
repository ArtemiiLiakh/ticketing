import { useOAuth } from '@/hooks/useOAuth';
import { useApiRequest } from '@/hooks/useRequest';
import { OAuthType } from '@app2/common/types';
import Router from 'next/router';
import { useEffect } from 'react';

const GithubCallback = () => {
  const { request } = useApiRequest();
  const { callOAuth, errors } = useOAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search.substring(1));
    const code = params.get('code');

    if (code) {
      const state = params.get('state');
      const authState = localStorage.getItem('state');
      
      if (state !== authState) {
        console.log('State token is invalid');
        return;
      }

      request({
        path: `/oauth/github/token?code=${code}`,
        method: 'get',
      }).then((res) => {
        console.log(res?.data);
        callOAuth(OAuthType.GITHUB, res?.data['token'])
        .then((data) => {
          if (data) Router.push('/');
        });
      });
    }
  }, []);

  return <>
    { errors ?? 'OK' }
  </>;
}
 
export default GithubCallback;