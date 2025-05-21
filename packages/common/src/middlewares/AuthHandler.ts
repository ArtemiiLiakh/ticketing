import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenException } from '../exceptions/ForbiddenException';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { _COMMON_CONFIG } from '../config';
import { AuthRequest } from '../types';

export const AuthHandler = (req: AuthRequest, res: Response, next: NextFunction) : void=> {
  if (!req?.session?.jwt) {
    throw new UnauthorizedException();
  }

  jwt.verify(req.session.jwt, _COMMON_CONFIG.JWT_SECRET, (err, payload) => {
    if (err) {
      throw new ForbiddenException();
    }

    req.body.user = payload;
  });

  next();
}