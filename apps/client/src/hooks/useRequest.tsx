import { api } from '@/api';
import { IException } from '@app2/common/exceptions';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';

interface RequestProps {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  data?: any;
}

export const useApiRequest = () => {
  const [errors, setErrors] = useState<ReactElement>();
  
  const request = async ({path, method, data }: RequestProps) => {
    const response = await api[method]('/api'+path, data, {
      withCredentials: true,
    }).catch((error: AxiosError<IException>) => {
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

    if (response) {
      setErrors(undefined);
    }

    return response;
  }
  return {
    request,
    errors,
    setErrors,
  };
}