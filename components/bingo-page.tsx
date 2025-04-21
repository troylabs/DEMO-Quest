"use client";

import ProgressBar from "./progress-bar";
import BingoCard from "./bingo-card";
import Header from "@/components/header";
import { getUserId } from "@/lib/auth-utils"; // custom utility that returns user ID string
import { useState, useEffect } from "react";
import { staticBingoCard as board1 } from "@/lib/board1";
import { staticBingoCard as board2 } from "@/lib/board2";

export default function BingoContainer() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [activeBoard, setActiveBoard] = useState<"board1" | "board2">("board1");
  const [key, setKey] = useState(0); // Add a key to force re-render of BingoCard
  const [allMarked, setAllMarked] = useState<number[]>([]);
  const [tried, setTried] = useState<number[]>([]);

  const fetchData = async () => {
    const id = await getUserId();

    // Fetch data for the active board
    const res = await fetch(
      `/api/bingo/progress?userId=${id}&boardType=${activeBoard}`
    );
    const data = await res.json();

    // Fetch data for both boards to calculate total score
    const board1Res = await fetch(
      `/api/bingo/progress?userId=${id}&boardType=board1`
    );
    const board1Data = await board1Res.json();

    const board2Res = await fetch(
      `/api/bingo/progress?userId=${id}&boardType=board2`
    );
    const board2Data = await board2Res.json();

    // Calculate total score from both boards
    const board1Score = board1Data.score || 0;
    const board2Score = board2Data.score || 0;
    const combinedScore = board1Score + board2Score;

    //updating values
    setProgress(data.allMarked.length);
    setAllMarked(data.allMarked);
    setTried(data.tried);
    setScore(data.score);
    setTotalScore(combinedScore);

    return { id, data };
  };

  const sendResult = async (
    userId: string,
    boothIndex: number,
    answer: string
  ) => {
    console.log("Making POST request to /api/bingo/check");
    const res = await fetch("/api/bingo/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        boothIndex: boothIndex,
        answer: answer,
        boardType: activeBoard,
      }),
      credentials: "include",
    });

    console.log("Response received:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    // Fetch updated data for both boards to calculate new total score
    const board1Res = await fetch(
      `/api/bingo/progress?userId=${userId}&boardType=board1`
    );
    const board1Data = await board1Res.json();

    const board2Res = await fetch(
      `/api/bingo/progress?userId=${userId}&boardType=board2`
    );
    const board2Data = await board2Res.json();

    // Calculate new total score from both boards
    const board1Score = board1Data.score || 0;
    const board2Score = board2Data.score || 0;
    const combinedScore = board1Score + board2Score;

    //updating values
    setProgress(data.allMarked.length);
    setAllMarked(data.allMarked);
    setTried(data.tried);
    setScore(data.newScore);
    setTotalScore(combinedScore);

    return {
      ...data,
      tried: data.tried || [],
    };
  };

  // Fetch data when activeBoard changes
  useEffect(() => {
    fetchData();
    // Increment key to force re-render of BingoCard
    setKey((prevKey) => prevKey + 1);
  }, [activeBoard]);

  const handleBoardChange = (board: "board1" | "board2") => {
    setActiveBoard(board);
  };

  return (
    <div>
      <Header
        score={totalScore}
        activeBoard={activeBoard}
        onBoardChange={handleBoardChange}
      />
      <div className="container mx-auto px-4 pb-8 pt-2">
        <ProgressBar progress={progress} />
        <BingoCard
          key={key} // Add key to force re-render when board changes
          fetchData={fetchData}
          sendResult={sendResult}
          bingoCard={activeBoard === "board1" ? board1 : board2}
          allMarked={allMarked}
        />
      </div>
    </div>
  );
}
