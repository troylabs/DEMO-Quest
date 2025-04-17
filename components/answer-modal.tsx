"use client";

import { useState, FormEvent } from "react";
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
import { Textarea } from "@/components/ui/textarea";

interface Booth {
  index: number;
  name: string;
  question?: string;
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
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answer.trim()) {
      setIsSubmitting(true);
      setError(null);
      try {
        await onSubmit(answer.trim());
        setAnswer("");
        onClose(); // Close the modal after successful submission
      } catch (error) {
        console.error("Error submitting answer:", error);
        setError(
          error instanceof Error ? error.message : "Failed to submit answer"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!booth) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            {error && (
              <div className="bg-red-500/10 text-red-300 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400 rounded-lg"
              required
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900 font-bold rounded-lg ${
                isSubmitting ? "opacity-80" : ""
              }`}
              disabled={!answer.trim() || isSubmitting}
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
