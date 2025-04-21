import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import UserModel from "@/utils/backend/models/user";

export async function GET(req: NextRequest) {
  //making sure user logged in
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "No user ID provided" }, { status: 400 });
  }

  //connecting to database
  await dbConnect();
  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get the board type from query params
  const boardType = req.nextUrl.searchParams.get("boardType") || "board1";
  
  // Get the current game state based on board type
  const currentGame = user.games?.[boardType];

  if (!currentGame) {
    // If no game exists, return empty arrays
    return NextResponse.json({
      allMarked: [],
      tried: [],
      completedLines: [],
      score: 0
    });
  }

  // Get all completed lines
  const completedLines = [
    ...currentGame.completedRows.map((row: number) =>
      Array.from({ length: 5 }, (_, i) => row * 5 + i)
    ),
    ...currentGame.completedCols.map((col: number) =>
      Array.from({ length: 5 }, (_, i) => col + i * 5)
    ),
    ...currentGame.completedDiags.map((diag: number) =>
      diag === 0 ? [0, 6, 12, 18, 24] : [4, 8, 12, 16, 20]
    ),
  ];

  const markedSquares = new Set([...currentGame.marked]);
  const triedSquares = new Set([...currentGame.tried]);

  return NextResponse.json({
    allMarked: Array.from(markedSquares),
    tried: Array.from(triedSquares),
    completedLines,
    score: currentGame.score
  });
}
