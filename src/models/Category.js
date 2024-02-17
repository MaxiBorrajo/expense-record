import mongoose from "mongoose";
import ExpenseService from "../services/Expense.service.js";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    icon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "icons",
      default: "65949d729712967dc6d59c7c",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorySchema.post("deleteOne", async function (doc, next) {
  const expenses = await ExpenseService.getByFilter({ category_id: doc.id });

  if (expenses && expenses.length > 0) {
    expenses.forEach(async (expense) => {
      expense.category_id = "65a15641908ecc879cc67b02";
      await expense.save();
    });
  }

  next();
});

const category = new mongoose.model("categories", categorySchema);

export default category;
