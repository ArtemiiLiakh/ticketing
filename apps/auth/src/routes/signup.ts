import { SignUpDTO } from '@app2/common/dtos';
import { Body } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { AuthComponentDI } from '@components/di/AuthComponentDI';
import express, { Response } from 'express';

const router = express.Router()

router.post('/signup', validateRequest({
    body: SignUpDTO,
  }), 
  async (req: Body<SignUpDTO>, res: Response) => {
    const { email, password, name, pictureUrl } = req.body;

    const { access_token } = await AuthComponentDI.signUp({
      email,
      password,
      name,
      pictureUrl,
    });

    req.session = {
      jwt: access_token,
    }

    res.status(201).send({
      message: "ok"
    });
  }
);

export { router as signupRouter };

