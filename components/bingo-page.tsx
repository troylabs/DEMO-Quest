"use client";

import ProgressBar from "./progress-bar";
import BingoCard from "./bingo-card";
import Header from "@/components/header";
import { getUserId } from "@/lib/auth-utils"; // custom utility that returns user ID string
import { useState } from "react";

export default function BingoContainer() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const fetchData = async () => {
    const id = await getUserId();
    const res = await fetch(`/api/bingo/progress?userId=${id}`);
    const data = await res.json();

    //updating values
    setProgress(data.allMarked.length-1);
    setScore(data.score);

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
      }),
    });

    console.log("Response received:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    //updating values
    setProgress(data.allMarked.length-1);
    setScore(data.newScore);

    return data;
  };

  return (
    <div>
      <Header score={score} />
      <div className="container mx-auto px-4 pb-8 pt-2">
        <ProgressBar progress={progress} />
        <BingoCard fetchData={fetchData} sendResult={sendResult} />
      </div>
    </div>
  );
}
