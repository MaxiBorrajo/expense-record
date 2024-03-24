//imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
    budget: {
      type: Number,
      default:0,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "The budget must be greater than zero",
      },
    },
    blockNotifications: {
      type: Boolean,
      default: false,
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
