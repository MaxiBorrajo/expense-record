import {
  NotFoundError,
  ServerError,
  UnauthenticatedError,
  BadRequestError,
  UserNotFoundError,
  UnauthorizedError,
  UserAlreadyExistsError,
  EmailOrPasswordWrongError,
  ResetPasswordCodeExpiredError,
  InvalidResetPasswordCodeError,
  BadLoginMethodError,
  AttributeNotAllowedError,
  MissingAttributeError,
  EmailIsRequiredError,
  InvalidEmailError,
  PasswordIsRequiredError,
  InvalidPasswordError,
  DatabaseConnectionFailedError,
  InvalidCodeError,
  CodeExpiredError,
  PasswordResetCodeAlreadyVerifiedError
} from "./customErrors.js";

export const errors = {
  NOT_FOUND: NotFoundError,
  SERVER_ERROR: ServerError,
  UNAUTHENTICATED: UnauthenticatedError,
  UNAUTHORIZED: UnauthorizedError,
  BAD_REQUEST: BadRequestError,
  USER_NOT_FOUND: UserNotFoundError,
  USER_ALREADY_EXISTS: UserAlreadyExistsError,
  EMAIL_OR_PASSWORD_WRONG: EmailOrPasswordWrongError,
  INVALID_RESET_PASSWORD_TOKEN: InvalidResetPasswordCodeError,
  RESET_PASSWORD_TOKEN_EXPIRED: ResetPasswordCodeExpiredError,
  BAD_LOGIN_METHOD: BadLoginMethodError,
  ATTRIBUTE_NOT_ALLOWED: AttributeNotAllowedError,
  MISSING_ATTRIBUTES: MissingAttributeError,
  EMAIL_IS_REQUIRED: EmailIsRequiredError,
  INVALID_EMAIL: InvalidEmailError,
  PASSWORD_IS_REQUIRED: PasswordIsRequiredError,
  INVALID_PASSWORD: InvalidPasswordError,
  DATABASE_CONNECTION_FAILED: DatabaseConnectionFailedError,
  INVALID_CODE: InvalidCodeError,
  CODE_EXPIRED: CodeExpiredError,
  PASSWORD_RESET_CODE_ALREADY_VERIFIED: PasswordResetCodeAlreadyVerifiedError
};