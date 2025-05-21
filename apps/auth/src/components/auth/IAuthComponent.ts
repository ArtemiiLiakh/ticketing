import { GetMeDTO } from './handlers/Me/GetMeDTO';
import { GetMeResponse } from './handlers/Me/GetMeResponse';
import { SignInDTO } from './handlers/SignIn/SignInDTO';
import { SignInResponse } from './handlers/SignIn/SignInResponse';
import { SignUpDTO } from './handlers/SignUp/SignUpDTO';
import { SignUpResponse } from './handlers/SignUp/SignUpResponse';

export interface IAuthComponent {
  me(dto: GetMeDTO): Promise<GetMeResponse>;
  signIn(dto: SignInDTO): Promise<SignInResponse>;
  signUp(dto: SignUpDTO): Promise<SignUpResponse>;
}