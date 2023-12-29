import _ from "lodash";
import { errors } from "../utils/errorDictionary.js";

function body_must_not_contain_attributes(attributes_to_exclude) {
  return function (req, res, next) {
    try {
      const body_attributes = Object.keys(req.body);

      const found_attribute = body_attributes.find((attribute) =>
        attributes_to_exclude.includes(attribute)
      );

      if (found_attribute) {
        throw new errors.ATTRIBUTE_NOT_ALLOWED(found_attribute);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
}

function body_must_contain_attributes(mustAttributes) {
  return function (req, res, next) {
    try {
      const bodyAttributes = Object.keys(req.body);

      const intersectedAttributes = _.intersection(
        bodyAttributes,
        mustAttributes
      );

      if (!_.isEqual(intersectedAttributes.sort(), mustAttributes.sort())) {
        const missingAttributes = _.difference(mustAttributes, bodyAttributes);

        throw new errors.MISSING_ATTRIBUTES(missingAttributes);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
}

function meetsWithEmailRequirements(req, res, next) {
  try {
    const email = req.body.email;

    if (!email) {
      throw new errors.EMAIL_IS_REQUIRED();
    }

    const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegularExpression.test(email)) {
      throw new errors.INVALID_EMAIL();
    }

    return next();
  } catch (error) {
    next(error);
  }
}

function meetsWithPasswordRequirements(req, res, next) {
  try {
    const password = req.body.password;

    if (!password) {
      throw new errors.PASSWORD_IS_REQUIRED();
    }

    const passwordRegularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegularExpression.test(password)) {
      throw new errors.INVALID_PASSWORD();
    }

    return next();
  } catch (error) {
    next(error);
  }
}

export {
  body_must_contain_attributes,
  meetsWithEmailRequirements,
  meetsWithPasswordRequirements,
  body_must_not_contain_attributes,
};
