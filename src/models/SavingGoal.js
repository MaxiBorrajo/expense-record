import mongoose from "mongoose";

const savingGoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    final_amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "The amount must be greater than zero",
      },
    },
    current_amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const savingGoal = new mongoose.model("savingGoals", savingGoalSchema);

export default savingGoal;
