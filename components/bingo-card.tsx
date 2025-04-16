"use client"

import { Check, Sparkles } from "lucide-react"
import { useState } from "react"
import confetti from "canvas-confetti"

import { Card } from "@/components/ui/card"
import AnswerModal from "./answer-modal"
import { generateBingoCard } from "@/lib/bingo-utils"
import { checkForBingo } from "@/lib/bingo-utils"

export default function BingoCard() {
  const [bingoCard, setBingoCard] = useState(generateBingoCard()) //change so that all users have same bingo
  const [selectedBooth, setSelectedBooth] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasBingo, setHasBingo] = useState(false)

  const handleBoothClick = (booth) => {
    if (booth && !completedBooths.includes(booth.id)) {
      // Add haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }

      setSelectedBooth(booth)
      setIsModalOpen(true)
    }
  }

  const handleAnswerSubmit = (answer) => {
    const newCompletedBooths = [...completedBooths, selectedBooth.id]
    setCompletedBooths(newCompletedBooths)
    setIsModalOpen(false)

    // Check for bingo
    const bingoResult = checkForBingo(bingoCard, newCompletedBooths)

    if (bingoResult.hasBingo && bingoResult.lines.length > bingoLines.length) {
      // New bingo line found!
      setBingoLines(bingoResult.lines)
      setHasBingo(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  // Determine if a cell is part of a bingo line
  const isPartOfBingoLine = (index) => {
    return bingoLines.some((line) => line.includes(index))
  }

  return (
    <>
      <Card className="border-none bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-5 gap-1.5 p-1.5">
          {bingoCard.map((booth, index) => (
            <div
              key={index}
              onClick={() => booth && handleBoothClick(booth)}
              className={`
                aspect-square flex flex-col items-center justify-center p-1 rounded-lg text-center
                transition-all duration-300 relative overflow-hidden
                ${booth ? "active:scale-95 touch-manipulation" : "bg-white/5"}
                ${
                  completedBooths.includes(booth?.id)
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
                  {isPartOfBingoLine(index) && <div className="absolute inset-0 bg-amber-300/30 animate-pulse"></div>}

                  <div className="text-xs font-bold line-clamp-2 z-10">{booth.name}</div>

                  {completedBooths.includes(booth.id) && (
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

      {hasBingo && (
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
  )
}

