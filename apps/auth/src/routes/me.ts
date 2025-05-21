import { AuthHandler } from '@app2/common/middlewares';
import { AuthRequest } from '@app2/common/types';
import { AuthComponentDI } from '@components/di/AuthComponentDI';
import express, { Response } from 'express';

const router = express.Router()

router.get('/me',
  AuthHandler,
  async (req: AuthRequest, res: Response) => {
    const user = await AuthComponentDI.me({
      id: req.body.user.id,
    });

    res.send(user);
  },
);

export { router as meRouter };

