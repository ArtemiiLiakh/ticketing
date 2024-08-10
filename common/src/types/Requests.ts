import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface AuthRequest extends Request<unknown, unknown, unknown, unknown> {
  user?: TokenPayload;
}
export interface Body<B=any> extends Request<unknown, unknown, B, unknown> {
  body: B;
}

export interface Query<Q extends {} = any> extends Request<unknown, unknown, unknown, Q> {
  query: Q;
}

export interface Params<P extends {} = any> extends Request<P, unknown, unknown, unknown> {
  params: P;
}