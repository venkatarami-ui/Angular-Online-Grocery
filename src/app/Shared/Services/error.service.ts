import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  errorMsgs = {
    UNKNOWN: ' An Unknown Error is Occurred.',
    TOKEN_EXPIRED: `The user's credential is no longer valid. The user must sign in again.`,
    USER_DISABLED: `The user account has been disabled by an administrator.`,
    USER_NOT_FOUND: `The user corresponding to the refresh token was not found. It is likely the user was deleted.`,
    EMAIL_EXISTS: `The email address is already in use by another account.`,
    OPERATION_NOT_ALLOWED: `Password sign-in is disabled for this project.`,
    TOO_MANY_ATTEMPTS_TRY_LATER: `We have blocked all requests from this device due to unusual activity. Try again later.`,
    EMAIL_NOT_FOUND:
      'This email is not registered or the user may have been deleted.',
    INVALID_PASSWORD:
      'The password is invalid or the user does not have a password.',
  };
}
