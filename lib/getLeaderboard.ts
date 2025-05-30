import { dbConnect } from '@/utils/db';
import user from "@/utils/backend/models/user";

interface User {
  id: string;
  name: string;
  points: number;
  completedSquares: number;
  bingos: number;
}

export default async function getLeaderboardData(): Promise<User[]> {
  try {
    await dbConnect();
    
    // Use aggregation to calculate total scores and sort by them
    const topUsers = await user.aggregate([
      // Calculate combined board scores
      { $addFields: {
        totalScore: {
          $add: [
            { $ifNull: ["$games.board1.score", 0] },
            { $ifNull: ["$games.board2.score", 0] }
          ]
        }
      }},
      // Sort by the total score
      { $sort: { totalScore: -1, name: 1 } },
      // Limit to top 50
      { $limit: 50 }
    ]);
    
    // Process the results
    const top_users: User[] = [];
    for (const user_data of topUsers) {
      const id = user_data._id.toString();
      const name = user_data.name;
      
      // Calculate total score from both boards
      const board1Score = user_data.games?.board1?.score ?? 0;
      const board2Score = user_data.games?.board2?.score ?? 0;
      const totalScore = board1Score + board2Score;
      
      // Calculate total completed squares from both boards
      const board1Squares = user_data.games?.board1?.marked?.length ?? 0;
      const board2Squares = user_data.games?.board2?.marked?.length ?? 0;
      const totalSquares = board1Squares + board2Squares;
      
      // Calculate total bingos from both boards
      const board1Bingos = 
        (user_data.games?.board1?.completedCols?.length ?? 0) +
        (user_data.games?.board1?.completedDiags?.length ?? 0) +
        (user_data.games?.board1?.completedRows?.length ?? 0);
        
      const board2Bingos = 
        (user_data.games?.board2?.completedCols?.length ?? 0) +
        (user_data.games?.board2?.completedDiags?.length ?? 0) +
        (user_data.games?.board2?.completedRows?.length ?? 0);
        
      const totalBingos = board1Bingos + board2Bingos;
      
      top_users.push({
        id: id,
        name: name,
        points: totalScore,
        completedSquares: totalSquares,
        bingos: totalBingos,
      });
    }
    
    // Pad with dummy entries until we have exactly 3
    while (top_users.length < 3) {
      const idx = top_users.length + 1;
      top_users.push({
        id: idx.toString(),
        name: "???",
        points: 0,
        completedSquares: 0,
        bingos: 0,
      });
    }
    
    return top_users;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return [];
  }
}