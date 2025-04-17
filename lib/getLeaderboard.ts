import user from "@/utils/backend/models/user";

interface User {
  id: number;
  name: string;
  points: number;
  completedSquares: number;
  bingos: number;
}

export default async function getLeaderboardData(): Promise<User[]> {
  //get top users
  const topUsers = await user
    .find()
    .sort({ "currentGame.score": -1, "currentGame.lastUpdated": 1 })
    .limit(50);

  const top_users: User[] = [];
  for (const user_data of topUsers) {
    const id = user_data._id;
    const name = user_data.name;
    const score = user_data.currentGame?.score ?? 0;
    const completedSquares = user_data.currentGame?.marked;
    const bingos =
      (user_data.currentGame?.completedCols?.length ?? 0) +
      (user_data.currentGame?.completedDiags?.length ?? 0) +
      (user_data.currentGame?.completedRows?.length ?? 0);
    top_users.push({
      id: id,
      name: name,
      points: score,
      completedSquares: completedSquares,
      bingos: bingos,
    });
  }

  // Pad with dummy entries until we have exactly 3
  while (top_users.length < 3) {
    const idx = top_users.length + 1;
    top_users.push({
      id: idx,
      name: "???",
      points: 0,
      completedSquares: 0,
      bingos: 0,
    });
  }

  return top_users;
}
