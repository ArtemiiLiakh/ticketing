import { useOAuth } from '@/hooks/useOAuth';
import { OAuthType } from '@app2/common/types';
import Router from 'next/router';
import { useEffect } from 'react';

const OktaCallback = () => {
  const { errors, callOAuth } = useOAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');

    if (!accessToken) {
      console.log('No access token provided')
      return;
    }

    callOAuth(OAuthType.OKTA, accessToken)
    .then((data) => {
      if (data) Router.push('/');
    });
  }, []);

  return <>
    { errors ?? 'OK' }
  </>;
}
 
export default OktaCallback;