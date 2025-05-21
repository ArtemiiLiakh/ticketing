import { GetMeDTO } from './handlers/Me/GetMeDTO';
import { GetMeHandler } from './handlers/Me/GetMeHandler';
import { GetMeResponse } from './handlers/Me/GetMeResponse';
import { SignInDTO } from './handlers/SignIn/SignInDTO';
import { SignInHandler } from './handlers/SignIn/SignInHandler';
import { SignInResponse } from './handlers/SignIn/SignInResponse';
import { SignUpDTO } from './handlers/SignUp/SignUpDTO';
import { SignUpHandler } from './handlers/SignUp/SignUpHandler';
import { SignUpResponse } from './handlers/SignUp/SignUpResponse';
import { IAuthComponent } from './IAuthComponent';

export class AuthComponent implements IAuthComponent {
  constructor (
    private readonly getMeHandler: GetMeHandler,
    private readonly signInHandler: SignInHandler,
    private readonly signUpHandler: SignUpHandler,
  ) {}
  
  me(dto: GetMeDTO): Promise<GetMeResponse> {
    return this.getMeHandler.handle(dto);
  }

  signIn(dto: SignInDTO): Promise<SignInResponse> {
    return this.signInHandler.handle(dto);
  }

  signUp(dto: SignUpDTO): Promise<SignUpResponse> {
    return this.signUpHandler.handle(dto);
  }
}