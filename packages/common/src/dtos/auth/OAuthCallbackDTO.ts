import { IsEnum, IsNotEmpty } from 'class-validator';
import { OAuthType } from '../../types';
import { validationMessage } from '../../utils/validationMessage';

export class OAuthCallbackDTO {
  @IsNotEmpty(validationMessage('OAuth type must be specified'))
  @IsEnum(OAuthType)
    type: OAuthType;
  
  @IsNotEmpty(validationMessage('Access token must be provided'))
    access_token: string;
}