import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          
          return value === 0;
        },
        message: 'The amount must be distinct from zero'
      }
    },
    currency:{
      type: String,
      default: "USD"
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const expense = new mongoose.model(
  "expenses",
  expenseSchema
);

export default expense;
