"use client";

import { Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  score: number;
  activeBoard: "board1" | "board2";
  onBoardChange: (board: "board1" | "board2") => void;
}

export default function Header({
  score,
  activeBoard,
  onBoardChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-violet-700 to-indigo-700 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
              <Trophy className="h-5 w-5 text-amber-300" />
            </div>
            <h1 className="text-xl font-bold text-white">DEMO Quest</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-white/10 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  activeBoard === "board1"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => onBoardChange("board1")}
              >
                Board 1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`${
                  activeBoard === "board2"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => onBoardChange("board2")}
              >
                Board 2
              </Button>
            </div>

            <Link href="/leaderboard">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 rounded-full"
              >
                Leaderboard
              </Button>
            </Link>

            <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="text-amber-300 font-bold">{score} pts</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
