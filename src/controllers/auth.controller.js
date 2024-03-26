import authService from "../services/Auth.service.js";
import userService from "../services/User.service.js";

async function handleGoogle(req, res, next) {
  try {
    const foundUser = await userService.getByFilter({ email: req.body.email });

    if (foundUser) {
      return await login(req, res, next);
    } else {
      return await register(req, res, next);
    }
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const createdUser = await authService.create(req.body);

    return res.status(201).json({
      message: "User created successfully",
      resource: createdUser,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const userLogged = await authService.login(req.body);

    return res.status(200).json({
      message: "User logged successfully",
      resource: userLogged,
    });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    await authService.forgotPassword(req.body.email);

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function verifyCode(req, res, next) {
  try {
    await authService.verifyCode(req.body);

    return res.status(200).json({
      message: "Code verified successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    await authService.resetPassword(req.body);

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export {
  register,
  forgotPassword,
  resetPassword,
  login,
  verifyCode,
  handleGoogle,
};
