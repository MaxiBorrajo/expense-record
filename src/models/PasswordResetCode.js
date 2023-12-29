import mongoose from "mongoose";

const passwordResetCodeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    code_expiration: {
      type: Date,
      default: new Date(Date.now() + 1000 * 60 * 10),
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const password_reset_code = new mongoose.model(
  "password_reset_codes",
  passwordResetCodeSchema
);

export default password_reset_code;
