//imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteImageInCloud } from "../middlewares/uploadsImage.middleware.js";
//schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
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
    publicId: {
      type: String,
      default: "default",
    },
    urlProfilePhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dixntuyk8/image/upload/v1693830223/x1vdmydenrkd3luzvjv6.png",
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

userSchema.post("deleteOne", async function (doc, next) {
  if (doc.publicId != "default") {
    await deleteImageInCloud(doc.publicId);
  }

  next();
});

const user = new mongoose.model("users", userSchema);

export default user;
