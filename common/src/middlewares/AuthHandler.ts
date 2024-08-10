import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { _COMMON_CONFIG } from '../config';
import { AuthRequest } from '../types';

export const AuthHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req?.session?.jwt) {
    throw new UnauthorizedException();
  }

  jwt.verify(req.session.jwt, _COMMON_CONFIG.JWT_SECRET, (err: any, payload: any) => {
    if (err) {
      throw new ForbiddenException();
    }

    req.user = payload;
  });

  next();
}