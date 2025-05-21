import { SignInDTO } from '@app2/common/dtos';
import { Body } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { AuthComponentDI } from '@components/di/AuthComponentDI';
import express, { Response } from 'express';

const router = express.Router();

router.post('/signin', validateRequest({
    body: SignInDTO,
  }), 
  async (req: Body<SignInDTO>, res: Response) => { 
    const { email, password } = req.body;
    
    const { id, access_token } = await AuthComponentDI.signIn({
      email,
      password
    });
    
    req.session = {
      jwt: access_token,
    };

    res.status(200).send({
      id,
    });
  }
);

export { router as signinRouter };

