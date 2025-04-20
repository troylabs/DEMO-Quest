"use client";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mb-6 mt-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">Your Progress</span>
        <span className="text-sm font-bold text-white">
          {progress}/25 Booths
        </span>
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(progress / 25) * 100}%` }}
        />
      </div>

      {progress === 0 && (
        <div className="mt-2 text-center animate-pulse text-white/80 text-sm">
          Tap a booth to get started!
        </div>
      )}
    </div>
  );
}
