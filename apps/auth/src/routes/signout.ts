import { AuthHandler } from '@app2/common/middlewares';
import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/signout', AuthHandler, (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };

