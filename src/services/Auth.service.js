import UserRepository from "../repositories/User.repository.js";
import PasswordResetCodeRepository from "../repositories/PasswordResetCode.repository.js";
import BaseService from "./Base.service.js";
import { errors } from "../utils/errorDictionary.js";
import sendEmail from "../utils/sendEmail.js";
import { UserDto } from "../dto/UserDto.js";
import bcrypt from "bcrypt";

class AuthService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  async create(object) {
    try {
      const user = await this.repository.getByFilter({ email: object.email });

      this.validateUserAlreadyRegistered(user);

      const createdUser = await this.repository.create(object);

      return {
        token: await createdUser.generateAuthToken(createdUser),
        user: new UserDto(createdUser),
      };
    } catch (error) {
      throw error;
    }
  }

  validateUserAlreadyRegistered(user) {
    if (user) {
      throw new errors.USER_ALREADY_EXISTS();
    }
  }

  async login(object) {
    try {
      const user = await this.repository.getByFilter({ email: object.email });

      this.validateAuthMethod(user);
      await this.validateUserCredentials(user, object.password);

      return {
        token: await user.generateAuthToken(user),
        user: new UserDto(user),
      };
    } catch (error) {
      throw error;
    }
  }

  async validateUserCredentials(user, password) {
    if (!user || !(await user.matchPasswords(password))) {
      throw new errors.EMAIL_OR_PASSWORD_WRONG();
    }
  }

  validateAuthMethod(user) {
    if (user && user.oauthuser) {
      throw new errors.BAD_LOGIN_METHOD();
    }
  }

  async forgotPassword(email) {
    try {
      const user = await this.repository.getByFilter({ email: email });

      this.validateUserExists(user);

      const code = this.generateCode();

      this.deletePasswordResetCodeIfExists(email);

      await PasswordResetCodeRepository.create({
        email: email,
        code: await this.hashCode(code),
      });

      sendEmail({
        to: email,
        subject: "Password Reset",
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Recovery</title>
                <style>
                    body {
                        background-color: #1a202c;
                        color: #fff;
                        padding: 2rem;
                    }
            
                    .container {
                        max-width: 28rem;
                        margin: 0 auto;
                        background-color: #4a5568;
                        padding: 2rem;
                        border-radius: 0.375rem;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    }
            
                    h2 {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-bottom: 1rem;
                    }
            
                    p {
                        margin-bottom: 1rem;
                    }
            
                    .verification-code {
                        font-size: 2rem;
                        font-weight: bold;
                        margin-bottom: 1.5rem;
                    }
            
                    .footer {
                        margin-top: 2rem;
                        text-align: center;
                        color: #cbd5e0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Password Recovery</h2>
                    <p>Hello,</p>
                    <p>We have received a request to reset your password. Below is a six-digit verification code:</p>
            
                    <div class="verification-code">${code}</div>
            
                    <p>This verification code will expire in 10 minutes. If you did not request this change, you can ignore this email.</p>
            
                    <p>Thank you,<br>The KANBAN Team</p>
                </div>
            
                <div class="footer">
                    This is an automated message, please do not reply to this email.
                </div>
            </body>
            </html>
            `,
      });
    } catch (error) {
      throw error;
    }
  }

  async hashCode(code) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(code.toString(), salt);
  }

  async deletePasswordResetCodeIfExists(email) {
    try {
      const foundPasswordResetCode =
        await PasswordResetCodeRepository.getByFilter({
          email: email,
        });

      if (foundPasswordResetCode) {
        await PasswordResetCodeRepository.deleteByFilter({
          email: email,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  validateUserExists(user) {
    if (!user || user.oauthuser) {
      throw new errors.USER_NOT_FOUND();
    }
  }

  generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async verifyCode(object) {
    try {
      const foundPasswordResetCode =
        await PasswordResetCodeRepository.getByFilter({
          email: object.email,
        });

      await this.validateCode(foundPasswordResetCode, object.code);

      this.validateCodeAlreadyVerified(foundPasswordResetCode.verified);

      foundPasswordResetCode.verified = true;
      await foundPasswordResetCode.save();
    } catch (error) {
      throw error;
    }
  }

  async validateCode(passwordResetCode, code) {
    if (
      !passwordResetCode ||
      !(await bcrypt.compare(code, passwordResetCode.code))
    ) {
      throw new errors.INVALID_CODE();
    }
  }

  validateCodeAlreadyVerified(verified) {
    if (verified) {
      throw new errors.PASSWORD_RESET_CODE_ALREADY_VERIFIED();
    }
  }

  async resetPassword(object) {
    try {
      const foundPasswordResetCode =
        await PasswordResetCodeRepository.getByFilter({
          email: object.email,
        });

      this.validateVerifiedCode(foundPasswordResetCode);
      this.validateCodeExpiration(foundPasswordResetCode.code_expiration);

      const user = await this.repository.getByFilter({
        email: object.email,
      });

      user.password = object.password;

      await user.save();

      this.deletePasswordResetCodeIfExists(object.email);
    } catch (error) {
      throw error;
    }
  }

  validateVerifiedCode(passwordResetCode) {
    if (!passwordResetCode || !passwordResetCode.verified) {
      throw new errors.INVALID_CODE();
    }
  }

  validateCodeExpiration(expiration) {
    if (Date.now() > expiration) {
      throw new errors.CODE_EXPIRED();
    }
  }
}

export default new AuthService();
