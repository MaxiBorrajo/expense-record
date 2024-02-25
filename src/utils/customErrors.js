export class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message) {
    super(400, message);
  }
}

export class ServerError extends CustomError {
  constructor(message) {
    super(500, message);
  }
}

export class NotFoundError extends BadRequestError {
  constructor(entity = "NotFound") {
    super(`${entity} not found`);
  }
}

export class UnauthenticatedError extends CustomError {
  constructor(message = "Unauthenticated") {
    super(401, message);
  }
}

export class UserAlreadyExistsError extends BadRequestError {
  constructor() {
    super(`User already exists`);
  }
}

export class InvalidCodeError extends BadRequestError {
  constructor() {
    super(`Password reset code not found or invalid`);
  }
}

export class PasswordResetCodeAlreadyVerifiedError extends BadRequestError {
  constructor() {
    super(`The password reset code has been already verified`);
  }
}

export class EmailOrPasswordWrongError extends UnauthenticatedError {
  constructor() {
    super(`Email or password are wrong`);
  }
}

export class InvalidResetPasswordCodeError extends UnauthenticatedError {
  constructor() {
    super(`Invalid reset password code`);
  }
}

export class ResetPasswordCodeExpiredError extends UnauthenticatedError {
  constructor() {
    super(`Reset password code expired`);
  }
}

export class BadLoginMethodError extends BadRequestError {
  constructor() {
    super(`Bad login method`);
  }
}

export class AttributeNotAllowedError extends BadRequestError {
  constructor(attribute) {
    super(`Attribute ${attribute} is not allowed`);
  }
}

export class MissingAttributeError extends BadRequestError {
  constructor(attribute) {
    super(`The following attribute "${attribute}" is missing`);
  }
}

export class EmailIsRequiredError extends BadRequestError {
  constructor() {
    super(`Email is required`);
  }
}

export class InvalidEmailError extends BadRequestError {
  constructor() {
    super(`Invalid email address`);
  }
}

export class InvalidPasswordError extends BadRequestError {
  constructor() {
    super(
      `The value of 'password' attribute must have at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&), and be 8 characters or longer`
    );
  }
}

export class PasswordIsRequiredError extends BadRequestError {
  constructor() {
    super(`Password is required`);
  }
}

export class DatabaseConnectionFailedError extends ServerError {
  constructor(message) {
    super(`Connection to database failed, ERROR: ${message}`);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(403, message ? message : "Unauthorized");
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super("User");
  }
}

export class CodeExpiredError extends UnauthorizedError {
  constructor() {
    super(`Password reset code has expired`);
  }
}
