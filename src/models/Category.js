import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const category = new mongoose.model("categories", categorySchema);

export default category;
