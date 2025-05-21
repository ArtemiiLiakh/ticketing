import { OAuthCallbackDTO } from '@app2/common/dtos';
import { BadBodyException, UnauthorizedException } from '@app2/common/exceptions';
import { OAuthType } from '@app2/common/types';
import { validateRequest } from '@app2/common/utils';
import { OAuthComponentDI } from '@components/di/OAuthComponentDI';
import config from '@config/index';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const OAuthCallbackRouter = express.Router()

OAuthCallbackRouter.post('/callback',
  validateRequest({
    query: OAuthCallbackDTO,
  }),
  async (req: Request, res: Response) => {
    const type = req.query.type;
    const accessToken = req.query.access_token;

    if (!type) {
      throw new BadBodyException('Callback type must be specified');
    }

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const id = await OAuthComponentDI[type as OAuthType].call(accessToken.toString());

    const token = jwt.sign(
      { id },
      config.JWT_SECRET!,
    );
    
    req.session = {
      jwt: token,
    };

    res.status(200).send({ id });
  },
);

export { OAuthCallbackRouter };

