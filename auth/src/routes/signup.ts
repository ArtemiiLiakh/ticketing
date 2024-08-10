import express, { Response } from 'express';
import { User } from '../models/user';
import { Hash } from '../security/hash';
import jwt from 'jsonwebtoken';
import config from '../config';
import { SignUpDTO, AlreadyExistsException, Body, validateRequest } from '@app2/common';

const router = express.Router()

router.post('/signup', validateRequest({
    body: SignUpDTO,
  }), 
  async (req: Body<SignUpDTO>, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (user) {
      throw new AlreadyExistsException('User');
    }

    const hashPassword = await Hash.toHash(password);

    const newUser = await User.build({
      email,
      password: hashPassword,
    }).save();

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      config.JWT_SECRET!,
    );

    req.session = {
      jwt: token,
    }

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
