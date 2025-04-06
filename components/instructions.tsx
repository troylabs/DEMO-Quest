"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Instructions() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="mb-6 border-purple-100">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-purple-900">How to Play</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-1 h-auto"
          >
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="space-y-3 text-sm text-gray-600 animate-in fade-in duration-200">
            <p>1. Visit startup booths around the exhibition.</p>
            <p>2. Tap a square on your bingo card to see the question for that booth.</p>
            <p>3. Talk to the startup team to find the answer.</p>
            <p>4. Submit your answer to mark the square as complete.</p>
            <p>5. Earn 1 point for each completed square.</p>
            <p>6. Complete a row, column, or diagonal to earn bonus points!</p>
            <p className="font-medium text-purple-700">More points = higher chance to win raffle prizes!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

