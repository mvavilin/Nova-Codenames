import type BaseComponent from '@ComponentsAPI/base/BaseComponent';
import { AuthStatus } from '@types';

export enum Access {
  PUBLIC = 'PUBLIC',
  UNAUTHORIZED = AuthStatus.UNAUTHORIZED,
  AUTHORIZED = AuthStatus.AUTHORIZED,
}

export interface Route {
  path: RegExp;
  page: new () => BaseComponent;
  access: Access;
}
