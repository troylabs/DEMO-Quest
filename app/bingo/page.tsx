import BingoCard from "@/components/bingo-card"
import Header from "@/components/header"
import ProgressBar from "@/components/progress-bar"

export default function BingoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-700 text-white">
      <Header />
      <div className="container mx-auto px-4 pb-8 pt-2">
        <ProgressBar />
        <BingoCard />
      </div>
    </main>
  )
}

