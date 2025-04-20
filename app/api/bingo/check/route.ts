import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import UserModel from "@/utils/backend/models/user";
import { checkBingo, PreviousBingos } from "@/lib/checkBingo";
import { staticBingoCard } from "@/lib/board1";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, boothIndex, answer } = body;

  await dbConnect();
  const user = await UserModel.findById(userId);
  if (!user)
    return NextResponse.json({ error: "User not found " }, { status: 404 });

  if (!user.currentGame) {
    user.currentGame = {
      marked: [],
      tried: [],
      completedRows: [],
      completedCols: [],
      completedDiags: [],
      score: 0
    };
  }

  // Always add to tried array regardless of correct/incorrect
  if (!user.currentGame.tried.includes(boothIndex)) {
    user.currentGame.tried.push(boothIndex);
  }

  // Get the correct answer from the booth data
  const booth = staticBingoCard[boothIndex];
  const isCorrect = booth && answer === booth.correctAnswer;

  // Only add to marked if correct answer
  if (isCorrect && !user.currentGame.marked.includes(boothIndex)) {
    user.currentGame.marked.push(boothIndex);
  }

  const prev: PreviousBingos = {
    rows: new Set(user.currentGame.completedRows),
    cols: new Set(user.currentGame.completedCols),
    diags: new Set(user.currentGame.completedDiags),
  };

  const result = checkBingo(user.currentGame.marked, prev);

  user.currentGame.completedRows.push(
    ...result.newBingos.filter((b) => b.type === "row").map((b) => b.index)
  );
  user.currentGame.completedCols.push(
    ...result.newBingos.filter((b) => b.type === "col").map((b) => b.index)
  );
  user.currentGame.completedDiags.push(
    ...result.newBingos.filter((b) => b.type === "diag").map((b) => b.index)
  );

  //update the user's score 10 points for each bingo, 1 point for each marked square
  let score = (user.currentGame.completedCols.length + user.currentGame.completedDiags.length + user.currentGame.completedRows.length) * 10;
  score += user.currentGame.marked.length;
  user.currentGame.score = score;
  console.log(user.currentGame.score);

  await user.save();

  return NextResponse.json({
    newScore: score,
    newLines: result.newBingos.map((line) => line.index),
    allMarked: user.currentGame.marked,
    tried: user.currentGame.tried,
  });
}
