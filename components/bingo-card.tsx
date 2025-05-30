"use client";

import { Check, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

import { Card } from "@/components/ui/card";
import AnswerModal from "./answer-modal";

type Booth = {
  id: number;
  name: string;
  question?: string;
  options?: string[];
  correctAnswer: string;
};

type FetchDataReturn = {
  id: string | null;
  data: any;
};

type BingoCardProps = {
  fetchData: () => Promise<FetchDataReturn>;
  sendResult: (
    userId: string,
    boothIndex: number,
    answer: string
  ) => Promise<any>;
  bingoCard: Booth[];
  allMarked?: number[]; 
};

export default function BingoCard({
  fetchData,
  sendResult,
  bingoCard,
  allMarked: initialMarked,
}: BingoCardProps) {
  const [selectedBooth, setSelectedBooth] = useState<null | {
    index: number;
    name: string;
    question?: string;
    correctAnswer: string;
  }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bingoLines, setBingoLines] = useState<number[][]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [lastAnsweredIndex, setLastAnsweredIndex] = useState<number | null>(
    null
  );
  const [marked, setMarked] = useState<number[]>(initialMarked || []);
  const [tried, setTried] = useState<number[]>([]);
  const [currentSessionTried, setCurrentSessionTried] = useState<number[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);

        const { id, data } = await fetchData();

        if (!id) {
          console.error("No user ID found - redirecting to login");
          window.location.href = "/"; // Redirect to login page
          return;
        }
        setUserId(id);

        // Set data from the API response
        const markedSquares = new Set([...(data.allMarked || [])]);
        const triedSquares = new Set([...(data.tried || [])]);
        setMarked(Array.from(markedSquares));

        // Set bingo lines from the API response
        setBingoLines(data.completedLines || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
        window.location.href = "/"; // Redirect to login page on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  // This effect runs when the component mounts and when initialMarked change
  useEffect(() => {
    if (initialMarked) setMarked(initialMarked);
  }, [initialMarked]);

  const handleBoothClick = (booth: {
    index: number;
    name: string;
    question?: string;
    correctAnswer: string;
  }) => {
    if (
      booth &&
      !marked.includes(booth.index) &&
      !currentSessionTried.includes(booth.index)
    ) {
      if (navigator.vibrate) navigator.vibrate(50);
      setSelectedBooth(booth);
      setIsModalOpen(true);
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!userId || !selectedBooth) {
      console.error("No user ID or booth selected");
      throw new Error("No user ID or booth selected");
    }

    setLastAnswer(answer);
    setLastAnsweredIndex(selectedBooth.index);

    setCurrentSessionTried((prev) => [...prev, selectedBooth.index]);

    if (answer === selectedBooth.correctAnswer) {
      const data = await sendResult(userId, selectedBooth.index, answer);
      const markedSquares = new Set([...(data.allMarked || [])]);
      setMarked(Array.from(markedSquares));

      // Only update bingo lines if new lines were completed
      if (data.newLines && data.newLines.length > 0) {
        const newLines = data.newLines.map((lineIndex: number) => {
          if (lineIndex === 0) return [0, 6, 12, 18, 24];
          if (lineIndex === 1) return [4, 8, 12, 16, 20];
          if (lineIndex >= 0 && lineIndex <= 4)
            return Array.from({ length: 5 }, (_, i) => lineIndex * 5 + i);
          if (lineIndex >= 5 && lineIndex <= 9)
            return Array.from({ length: 5 }, (_, i) => i * 5 + (lineIndex - 5));
          return [];
        });

        setBingoLines((prev) => [...prev, ...newLines]);

        // Show confetti and congrats message only for new bingos
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
        }, 5000);
      }
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
              ) : null}
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
