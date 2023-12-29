import jwt from "jsonwebtoken";
import userService from "../services/User.service.js";
import { errors } from "../utils/errorDictionary.js";

async function isAuthenticated(req, res, next) {
  if (await jwtValid(req, res, next)) {
    next();
  } else {
    next(new errors.UNAUTHENTICATED());
  }
}

async function isNotAuthenticated(req, res, next) {
  if (!(await jwtValid(req, res, next))) {
    next();
  } else {
    next(new errors.UNAUTHORIZED());
  }
}

async function jwtValid(req, res, next) {
  try {
    const authHeader = req.get("Authorization") || req.cookies.token;

    if (!authHeader) {
      return null;
    }

    const token = authHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.SECRET);

    const foundUser = await userService.getById(payload._id);
    
    if (!foundUser) {
      return null;
    }

    delete foundUser.password;

    req.user = foundUser;

    return foundUser;
  } catch (error) {
    next(error);
  }
}

export { isAuthenticated, isNotAuthenticated };
