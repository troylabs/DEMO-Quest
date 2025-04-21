import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import UserModel from "@/utils/backend/models/user";
import { checkBingo, PreviousBingos } from "@/lib/checkBingo";
import { staticBingoCard as board1 } from "@/lib/board1";
import { staticBingoCard as board2 } from "@/lib/board2";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, boothIndex, answer, boardType } = body;

  await dbConnect();
  const user = await UserModel.findById(userId);
  if (!user)
    return NextResponse.json({ error: "User not found " }, { status: 404 });

  // Initialize games structure if it doesn't exist
  if (!user.games) {
    user.games = {
      board1: {
        marked: [],
        tried: [],
        completedRows: [],
        completedCols: [],
        completedDiags: [],
        score: 0
      },
      board2: {
        marked: [],
        tried: [],
        completedRows: [],
        completedCols: [],
        completedDiags: [],
        score: 0
      }
    };
  }

  // Get the correct board data and game state
  const currentBoard = boardType === 'board2' ? board2 : board1;
  const currentGame = boardType === 'board2' ? user.games.board2 : user.games.board1;
  const booth = currentBoard[boothIndex];

  // Always add to tried array regardless of correct/incorrect
  if (!currentGame.tried.includes(boothIndex)) {
    currentGame.tried.push(boothIndex);
  }

  // Only add to marked if correct answer
  if (booth && answer === booth.correctAnswer && !currentGame.marked.includes(boothIndex)) {
    currentGame.marked.push(boothIndex);
  }

  const prev: PreviousBingos = {
    rows: new Set(currentGame.completedRows),
    cols: new Set(currentGame.completedCols),
    diags: new Set(currentGame.completedDiags),
  };

  const result = checkBingo(currentGame.marked, prev);

  currentGame.completedRows.push(
    ...result.newBingos.filter((b) => b.type === "row").map((b) => b.index)
  );
  currentGame.completedCols.push(
    ...result.newBingos.filter((b) => b.type === "col").map((b) => b.index)
  );
  currentGame.completedDiags.push(
    ...result.newBingos.filter((b) => b.type === "diag").map((b) => b.index)
  );

  //update the user's score 10 points for each bingo, 1 point for each marked square
  let score = (currentGame.completedCols.length + currentGame.completedDiags.length + currentGame.completedRows.length) * 10;
  score += currentGame.marked.length;
  currentGame.score = score;
  console.log(currentGame.score);

  await user.save();

  return NextResponse.json({
    newScore: score,
    newLines: result.newBingos.map((line) => line.index),
    allMarked: currentGame.marked,
    tried: currentGame.tried,
  });
}
