import { UserData } from "@/types/userTypes";
import mongoose from "mongoose";
const { Schema } = mongoose;

const gameStateSchema = {
  marked: [Number],
  tried: [Number],
  completedRows: [Number],
  completedCols: [Number],
  completedDiags: [Number],
  score: { type: Number, default: 0 },
};

const userSchema = new Schema<UserData>(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
    games: {
      board1: gameStateSchema,
      board2: gameStateSchema
    }
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ "games.board1.score": -1 });
userSchema.index({ "games.board2.score": -1 });

export default mongoose.models.User || mongoose.model("User", userSchema);
