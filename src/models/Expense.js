import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
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
    isAutomaticallyCreated: {
      type: Boolean,
      default: false,
    },
    interval:{
      type:Number,
      required: function() { return this.isAutomaticallyCreated; }
    },
    jobId:{
      type:String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const expense = new mongoose.model("expenses", expenseSchema);

export default expense;
