import { JwtEncryptorDI } from '@security/di/JwtEncryptorDI';
import { Sha256HasherDI } from '@security/di/Sha256HasherDI';
import { AuthComponent } from '../auth/AuthComponent';
import { GetMeHandler } from '../auth/handlers/Me/GetMeHandler';
import { SignInHandler } from '../auth/handlers/SignIn/SignInHandler';
import { SignUpHandler } from '../auth/handlers/SignUp/SignUpHandler';
import { UserRepositoryDI } from './UserRepositoryDI';

const GetMeHandlerDI = new GetMeHandler(UserRepositoryDI);
const SignInHandlerDI = new SignInHandler(UserRepositoryDI, JwtEncryptorDI, Sha256HasherDI);
const SignUpHandlerDI = new SignUpHandler(UserRepositoryDI, JwtEncryptorDI, Sha256HasherDI);

export const AuthComponentDI = new AuthComponent(GetMeHandlerDI, SignInHandlerDI, SignUpHandlerDI);