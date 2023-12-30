//imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    oauthuser: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function (user) {
  return await jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: "30 days",
    }
  );
};

const user = new mongoose.model("users", userSchema);

export default user;
