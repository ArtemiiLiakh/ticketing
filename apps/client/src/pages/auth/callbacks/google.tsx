import { useOAuth } from '@/hooks/useOAuth';
import { OAuthType } from '@app2/common/types';
import Router from 'next/router';
import { useEffect } from 'react';

const OktaCallback = () => {
  const { callOAuth, errors } = useOAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    const state = params.get('state');

    const authState = localStorage.getItem('state');

    if (!accessToken) {
      console.log('No access token provided')
      return;
    }

    if (state !== authState) {
      console.log('State token is invalid');
      return;
    }

    callOAuth(OAuthType.GOOGLE, accessToken)
    .then((data) => {
      if (data) Router.push('/');
    });
  }, []);

  return <>
    { errors ?? 'OK' }
  </>;
}
 
export default OktaCallback;