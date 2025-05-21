import { api } from '@/api';
import Router from 'next/router';
import { useEffect } from 'react';

const SignOut = () => {
  useEffect(() => {
    api.get('/api/auth/signout', {
      withCredentials: true,
    }).then(() => {
      Router.push('/auth/login');
    });
  }, []); 

  return ( 
    <div>
      <h4>Signing out...</h4>
    </div>
  );
}
 
export default SignOut;