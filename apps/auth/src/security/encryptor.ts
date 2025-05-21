export interface Encryptor {
  encrypt(data: object, secret: string): Promise<string>;
  decrypt<TData>(token: string, secret: string): Promise<TData>;
  verify(token: string, secret: string): Promise<boolean>;
}