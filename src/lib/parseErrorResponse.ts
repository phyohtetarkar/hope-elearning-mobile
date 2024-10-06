import { ApiError } from './errors';

export function parseErrorResponse(error: any) {
  if (error instanceof TypeError) {
    return 'Server down';
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error.code) {
    if (error.code === 'auth/user-not-found') {
      return 'User not found.';
    }

    if (error.code === 'auth/wrong-password') {
      return 'Password incorrect.';
    }

    if (error.code === 'auth/invalid-credential') {
      return 'Email or password incorrect.';
    }

    if (error.code === 'auth/network-request-failed') {
      return 'Network connection error.';
    }

    if (error.code === 'auth/email-already-in-use') {
      return 'Account already exists with this email address.';
    }

    if (error.code === 'auth/expired-action-code') {
      return 'Verification code expired.';
    }

    if (error.code === 'auth/invalid-action-code') {
      return 'Invalid verification code';
    }

    if (error.code === 'auth/too-many-requests') {
      return 'Too many attempts. Please try again later.';
    }
  }

  return error?.message ?? 'Something went wrong, please try again';
}
