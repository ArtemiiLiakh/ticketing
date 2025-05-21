import { Encryptor } from '@security/encryptor';
import jwt from 'jsonwebtoken';

export class JwtEncryptor implements Encryptor {
  encrypt(data: object, secret: string, config?: jwt.SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, secret, config ?? {
        algorithm: 'HS256'
      }, (error, encoded) => {
        if (error || !encoded) {
          reject(error);
          return;
        };
        resolve(encoded);
      });
    })
  }

  decrypt<T>(token: string, secret: string, config?: jwt.SignOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, config, (error, decoded) => {
        if (error || !decoded) {
          reject(error);
          return;
        }
        
        resolve(JSON.parse(decoded.toString()));
      })  
    });  
  }

  verify(token: string, secret: string, config?: jwt.SignOptions): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, secret, config, (error) => {
        resolve(!!error);
      });
    });
  }
}