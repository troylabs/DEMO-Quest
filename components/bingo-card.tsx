"use client";

import { Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

import { Card } from "@/components/ui/card";
import AnswerModal from "./answer-modal";
import { staticBingoCard } from "@/lib/bingo-utils"; // shared card
import { getUserId } from "@/lib/auth-utils"; // custom utility that returns user ID string

export default function BingoCard() {
  const [bingoCard] = useState(staticBingoCard); //change so that all users have same bingo
  const [marked, setMarked] = useState<number[]>([12]); //free box is always marked
  const [selectedBooth, setSelectedBooth] = useState<null | {
    index: number;
    name: string;
    question?: string;
  }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bingoLines, setBingoLines] = useState<number[][]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        const id = await getUserId();
        if (!id) {
          console.error("No user ID found");
          return;
        }
        setUserId(id);

        const res = await fetch(`/api/bingo/progress?userId=${id}`);
        const data = await res.json();
        // Ensure free box (12) is always included in marked squares
        const markedSquares = new Set([...(data.allMarked || []), 12]);
        setMarked(Array.from(markedSquares));
        setBingoLines(data.completedLines || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const handleBoothClick = (booth: {
    index: number;
    name: string;
    question?: string;
  }) => {
    if (booth && !marked.includes(booth.index)) {
      if (navigator.vibrate) navigator.vibrate(50);
      setSelectedBooth(booth);
      setIsModalOpen(true);
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    console.log("handleAnswerSubmit called with answer:", answer);
    if (!userId) {
      console.error("No user ID available");
      throw new Error("No user ID available");
    }

    if (!selectedBooth) {
      console.error("No booth selected");
      throw new Error("No booth selected");
    }

    console.log("Making POST request to /api/bingo/check");
    const res = await fetch("/api/bingo/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        boothIndex: selectedBooth.index,
        answer: answer,
      }),
    });

    console.log("Response received:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    // Ensure free box (12) is always included in marked squares
    const markedSquares = new Set([...(data.allMarked || []), 12]);
    setMarked(Array.from(markedSquares));

    setBingoLines((prev) => {
      const newLineArrays = data.newLines.map((lineIndex: number) => {
        if (lineIndex === 0) return [0, 6, 12, 18, 24]; // diag TL → BR
        if (lineIndex === 1) return [4, 8, 12, 16, 20]; // diag TR → BL
        if (lineIndex >= 0 && lineIndex <= 4)
          return Array.from({ length: 5 }, (_, i) => lineIndex * 5 + i); // rows
        if (lineIndex >= 5 && lineIndex <= 9)
          return Array.from({ length: 5 }, (_, i) => i * 5 + (lineIndex - 5)); // cols
        return []; // fallback
      });
      return [...prev, ...newLineArrays];
    });

    //trigger confetti
    if (data.newScore > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Show congratulations message for 10 seconds
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
      }, 5000);
    }
  };

  const isPartOfBingoLine = (index: number) => {
    return bingoLines.some((line) => line.includes(index));
  };

  return (
    <>
      <Card className="border-none bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-5 gap-1.5 p-1.5">
          {bingoCard.map((booth, index) => (
            <div
              key={index}
              onClick={() => booth && handleBoothClick({ ...booth, index })}
              className={`
              aspect-square flex flex-col items-center justify-center p-1 rounded-lg text-center
              transition-all duration-300 relative overflow-hidden
              ${booth ? "active:scale-95 touch-manipulation" : "bg-white/5"}
              ${
                marked.includes(index)
                  ? "bg-gradient-to-br from-amber-400 to-amber-500 text-indigo-900"
                  : booth
                    ? "bg-white/10 hover:bg-white/15 cursor-pointer"
                    : ""
              }
              ${isPartOfBingoLine(index) ? "ring-2 ring-white" : ""}
            `}
            >
              {booth ? (
                <>
                  {isPartOfBingoLine(index) && (
                    <div className="absolute inset-0 bg-amber-300/30 animate-pulse"></div>
                  )}
                  <div className="text-xs font-bold line-clamp-2 z-10">
                    {booth.name}
                  </div>
                  {marked.includes(index) && (
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <Check className="h-3 w-3 text-indigo-900" />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Sparkles className="h-5 w-5 text-amber-300 mb-1" />
                  <div className="text-[10px] text-white/70">FREE</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {showCongrats && (
        <div className="mt-4 bg-amber-400 text-indigo-900 p-3 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex items-center justify-center gap-2 font-bold">
          <Sparkles className="h-5 w-5" />
          BINGO! You've completed a line!
          <Sparkles className="h-5 w-5" />
        </div>
      )}

      <AnswerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booth={selectedBooth}
        onSubmit={handleAnswerSubmit}
      />
    </>
  );
}
