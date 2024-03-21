import mongoose from "mongoose";

const automaticRegistrationSchema = new mongoose.Schema(
  {
    registration_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value != 0;
        },
        message: "The amount must be distinct from zero",
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const automaticRegistration = new mongoose.model(
  "automaticRegistration",
  automaticRegistrationSchema
);

export default automaticRegistration;
