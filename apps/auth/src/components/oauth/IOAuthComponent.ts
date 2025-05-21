import { OAuthType } from '@app2/common/types';
import { OAuthMethod } from './OAuthMethod';

export type IOAuthComponent = Readonly<Record<OAuthType, OAuthMethod>>;