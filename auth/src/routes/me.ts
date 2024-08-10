import express, { Response } from 'express';
import { AuthHandler, AuthRequest } from '@app2/common';

const router = express.Router()

router.get('/me',
  AuthHandler,
  (req: AuthRequest, res: Response) => {
    res.send(req.user);
  },
);

export { router as meRouter };