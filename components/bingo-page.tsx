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
  const [key, setKey] = useState(0); 
  const [allMarked, setAllMarked] = useState<number[]>([]);
  const [tried, setTried] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  type FetchDataReturn = {
    id: string;
    data: any;
  };

  const fetchData = async (): Promise<FetchDataReturn> => {
    try {
      const id = await getUserId();
      if (!id) {
        throw new Error("User ID not found");
      }

      const res = await fetch(
        `/api/bingo/progress?userId=${id}&boardType=${activeBoard}`
      );
      const data = await res.json();

      const board1Res = await fetch(
        `/api/bingo/progress?userId=${id}&boardType=board1`
      );
      const board1Data = await board1Res.json();

      const board2Res = await fetch(
        `/api/bingo/progress?userId=${id}&boardType=board2`
      );
      const board2Data = await board2Res.json();

      const board1Score = board1Data.score || 0;
      const board2Score = board2Data.score || 0;
      const combinedScore = board1Score + board2Score;

      setProgress(data.allMarked.length);
      setAllMarked(data.allMarked);
      setTried(data.tried);
      setScore(data.score);
      setTotalScore(combinedScore);

      return { id, data };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { id: "", data: { allMarked: [], tried: [], score: 0 } };
    }
  };

  const sendResult = async (
    userId: string,
    boothIndex: number,
    answer: string
  ) => {
    try {
      setIsLoading(true); 
      
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

      const board1Res = await fetch(
        `/api/bingo/progress?userId=${userId}&boardType=board1`
      );
      const board1Data = await board1Res.json();

      const board2Res = await fetch(
        `/api/bingo/progress?userId=${userId}&boardType=board2`
      );
      const board2Data = await board2Res.json();

      const board1Score = board1Data.score || 0;
      const board2Score = board2Data.score || 0;
      const combinedScore = board1Score + board2Score;

      setProgress(data.allMarked.length);
      setAllMarked(data.allMarked);
      setTried(data.tried);
      setScore(data.newScore);
      setTotalScore(combinedScore);
      
      setIsLoading(false); 
      
      return {
        ...data,
        tried: data.tried || [],
      };
    } catch (error) {
      console.error("Error sending result:", error);
      setIsLoading(false); 
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        setIsLoading(true);
        await fetchData();
        if (isMounted) {
          setKey((prevKey) => prevKey + 1);
          setIsLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-lg font-medium text-gray-700">Loading bingo card...</p>
          </div>
        ) : (
          <BingoCard
            key={key} 
            fetchData={fetchData}
            sendResult={sendResult}
            bingoCard={activeBoard === "board1" ? board1 : board2}
            allMarked={allMarked}
          />
        )}
      </div>
    </div>
  );
}