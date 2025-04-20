"use client";

import { useState, useEffect } from "react";
import { Send, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Booth {
  index: number;
  name: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
}

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  booth: Booth | null;
  onSubmit: (answer: string) => void;
}

export default function AnswerModal({
  isOpen,
  onClose,
  booth,
  onSubmit,
}: AnswerModalProps) {
  // ...existing state
  useEffect(() => {
    if (isOpen) {
      setSelected("");
      setLocked(false);
      setError(null);
    }
  }, [isOpen, booth?.index]);
  const [selected, setSelected] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !booth?.correctAnswer) return;

    setIsSubmitting(true);
    const isCorrect = selected.charAt(0) === booth.correctAnswer;
    setLocked(true);

    if (!isCorrect) {
      setError("That's not correct");
    }

    console.log("Selected:", selected);
    console.log("Correct Answer:", booth.correctAnswer);

    await new Promise((r) => setTimeout(r, 100));
    onSubmit(selected.charAt(0));
    setIsSubmitting(false);

    if (isCorrect) {
      onClose();
    }
  };

  const handleClose = () => {
    setSelected("");
    setLocked(false);
    setError(null);
    onClose();
  };

  if (!booth || !booth.options || !booth.correctAnswer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-none bg-gradient-to-b from-indigo-900 to-violet-950 text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{booth.name}</DialogTitle>
          <DialogDescription className="text-white/70">
            Talk to the team at this booth to find the answer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-sm">
              <p className="font-medium mb-1 text-amber-300">Question:</p>
              <p className="text-white">{booth.question}</p>
            </div>

            <div className="space-y-2">
              {booth.options.map((option, idx) => {
                const choice = option;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg cursor-pointer border transition
                      ${
                        locked
                          ? choice.charAt(0) === booth.correctAnswer
                            ? "bg-green-500/20 border-green-400"
                            : selected === choice
                              ? "bg-red-500/20 border-red-400"
                              : "opacity-60"
                          : selected === choice
                            ? "bg-white/20 border-white/20"
                            : "hover:bg-white/10 border-white/20"
                      }
                    `}
                    onClick={() => !locked && setSelected(choice)}
                  >
                    {option}
                  </div>
                );
              })}
            </div>
            {error && (
              <div className="bg-red-500/10 text-red-300 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-white hover:bg-white/10 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selected || isSubmitting || locked}
              className={`bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900 font-bold rounded-lg ${
                isSubmitting ? "opacity-80" : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Submit Answer
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
