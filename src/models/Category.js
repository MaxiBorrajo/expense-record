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
      required: true,
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

const category = new mongoose.model("categories", categorySchema);

export default category;
