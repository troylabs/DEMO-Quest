import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import UserModel from "@/utils/backend/models/user";
import { checkBingo, PreviousBingos } from "@/lib/checkBingo";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, boothIndex } = body;

  await dbConnect();
  const user = await UserModel.findById(userId);
  if (!user)
    return NextResponse.json({ error: "User not found " }, { status: 404 });

  if (!user.currentGame) {
    return NextResponse.json({ error: "No active game" }, { status: 400 });
  }

  if (user.currentGame.marked.includes(boothIndex)) {
    return NextResponse.json({ error: "Already marked" }, { status: 400 });
  }

  //add new booth
  user.currentGame.marked.push(boothIndex);
  console.log("Received boothIndex:", boothIndex);

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

  const allMarked = (user.currentGame.marked = user.currentGame.marked || []);
  allMarked.push(12);

  return NextResponse.json({
    newScore: result.score,
    newLines: result.newBingos.map((line) => line.index),
    allMarked: allMarked,
  });
}
