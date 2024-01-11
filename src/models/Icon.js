import mongoose from "mongoose";

const iconSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const icon = new mongoose.model("icons", iconSchema);

export default icon;
