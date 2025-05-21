import { Request } from 'express';
import { TokenPayload } from './TokenPayload';

export interface AuthRequest extends Request<unknown, unknown, unknown, unknown> {
  body: {
    user: TokenPayload;
  }
}

export interface AuthOptionalRequest extends Request<unknown, unknown, unknown, unknown> {
  body: {
    user?: TokenPayload;
  }
}

export interface Body<B=unknown> extends Request<unknown, unknown, B, unknown> {
  body: B;
}

export interface Query<Q=unknown> extends Request<unknown, unknown, unknown, Q> {
  query: Q;
}

export interface Params<P=unknown> extends Request<P, unknown, unknown, unknown> {
  params: P;
}