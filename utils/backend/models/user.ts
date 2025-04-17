import { UserData } from "@/types/userTypes";
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema<UserData>(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
    currentGame: {
      marked: [Number],
      completedRows: [Number],
      completedCols: [Number],
      completedDiags: [Number],
      score: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
