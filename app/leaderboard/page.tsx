export const dynamic = "force-dynamic";

import { ArrowLeft, Medal, Trophy, Users } from "lucide-react";
import Link from "next/link";
import getLeaderboardData from "@/lib/getLeaderboard";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-300" />
            <h1 className="text-xl font-bold">Leaderboard</h1>
          </div>
          <Link href="/bingo">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Top 3 Winners */}
          <div className="flex justify-center items-end gap-4 py-6 px-2">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center mb-2 border-2 border-white/30">
                <span className="text-xl font-bold text-gray-800">2</span>
              </div>
              <div className="h-20 w-16 bg-white/10 backdrop-blur-sm rounded-t-lg flex flex-col items-center justify-end pb-2">
                <span className="text-xs text-white/80">
                  {leaderboardData[1].name}
                </span>
                <span className="text-sm font-bold text-white">
                  {leaderboardData[1].points} pts
                </span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 flex items-center justify-center mb-2 border-2 border-white/30 shadow-lg">
                <span className="text-2xl font-bold text-amber-900">1</span>
              </div>
              <div className="h-28 w-20 bg-gradient-to-b from-amber-400/20 to-amber-500/20 backdrop-blur-sm rounded-t-lg flex flex-col items-center justify-end pb-2">
                <span className="text-xs text-white/80">
                  {leaderboardData[0].name}
                </span>
                <span className="text-sm font-bold text-white">
                  {leaderboardData[0].points} pts
                </span>
                <div className="mt-1 bg-amber-400/30 rounded-full px-2 py-0.5 text-[10px] text-white">
                  {leaderboardData[0].bingos} Bingos
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-700 to-amber-800 flex items-center justify-center mb-2 border-2 border-white/30">
                <span className="text-xl font-bold text-amber-100">3</span>
              </div>
              <div className="h-16 w-16 bg-white/10 backdrop-blur-sm rounded-t-lg flex flex-col items-center justify-end pb-2">
                <span className="text-xs text-white/80">
                  {leaderboardData[2].name}
                </span>
                <span className="text-sm font-bold text-white">
                  {leaderboardData[2].points} pts
                </span>
              </div>
            </div>
          </div>

          {/* Other Players */}
          <Card className="border-none bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-md text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-white/70" />
                Other Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.slice(3).map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/80">
                        {index + 4}
                      </div>
                      <div className="font-medium text-gray-100">{user.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-amber-300">
                        {user.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-2 text-center text-sm text-white/70 bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Medal className="h-5 w-5 text-amber-300" />
              <p className="font-medium text-white">Raffle Drawing</p>
            </div>
            <p>The raffle will take place at 5:00 PM at the main stage.</p>
            <p className="mt-1 text-amber-300 font-medium">
              Each point gives you one entry in the raffle!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
