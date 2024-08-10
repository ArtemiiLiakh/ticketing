import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signin = (userId: string = new mongoose.Types.ObjectId().toHexString()) => {
  const jwtPayload = {
    id: userId,
    email: 'test@gmail.com',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return `session=${base64}`;
}