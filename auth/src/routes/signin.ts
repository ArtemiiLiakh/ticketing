import express, { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AuthMapper } from '../mappers/auth.mapper';
import { User } from '../models/user';
import { Hash } from '../security/hash';
import { 
  SignInDTO, 
  UnauthorizedException, 
  BadBodyException, 
  Body, 
  validateRequest, 
} from '@app2/common';

const router = express.Router();
const authMapper = new AuthMapper();

router.post('/signin', validateRequest({
    body: SignInDTO,
  }), 
  async (req: Body<SignInDTO>, res: Response, next: NextFunction) => { 
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await Hash.compare(password, user.password))) {
      throw new BadBodyException();
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.JWT_SECRET!,
    );
    
    req.session = {
      jwt: token,
    };

    res.status(200).send(authMapper.signIn(user));
  }
);

export { router as signinRouter };