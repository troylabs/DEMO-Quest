"use client"

import { ArrowRight, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const { user, login, signup }  = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConformPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // already logged in, redirect to bingo page
    if (user) {
      router.push("/bingo")
    }
  }, [user, router])

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    const response = await login(email, password)
    setIsLoading(false)

    if (response) {
      router.push("/bingo")
    } else {
      alert("Login failed. Please check your credentials.")
    }
  }

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      alert("Passwords do not match.")
      setIsLoading(false)
      return
    }

    const response = await signup(email, password, name)
    setIsLoading(false)

    if (response) {
      router.push("/bingo")
    } else {
      alert("Signup failed. Please check your credentials.")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-700 text-white flex flex-col">
      {/* Header with logo */}
      <div className="flex flex-col items-center justify-center pt-10 pb-6 px-4">
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl mb-4">
          <Trophy className="h-10 w-10 text-amber-300" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">DEMO Quest</h1>
        <p className="text-white/70 text-center max-w-xs">Explore booths, answer questions, win prizes!</p>
      </div>

      {/* Login/Info Tabs */}
      <div className="flex-1 px-4 pb-8">
        <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="login" className="text-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-gray-200">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-gray-200">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <Card className="border-none bg-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>


                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900 font-bold"
                    disabled={isLoading || !email || !password}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Start Playing
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <Card className="border-none bg-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConformPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-amber-400"
                      required
                    />
                  </div>


                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900 font-bold"
                    disabled={isLoading || !email || !name}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Start Playing
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          

          {/* <TabsContent value="info" className="mt-4 space-y-4">
            <Card className="border-none bg-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-amber-300 mb-3">How to Play</h3>
                <div className="space-y-4 text-white/90">
                  <div className="flex gap-3">
                    <div className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 font-bold">1</span>
                    </div>
                    <p>Visit startup booths around the exhibition floor.</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 font-bold">2</span>
                    </div>
                    <p>Tap a square on your bingo card to see the question for that booth.</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 font-bold">3</span>
                    </div>
                    <p>Talk to the startup team to find the answer to the question.</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 font-bold">4</span>
                    </div>
                    <p>Submit your answer to mark the square as complete and earn points.</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 font-bold">5</span>
                    </div>
                    <p>Complete a row, column, or diagonal to earn bonus points!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-amber-300 mb-3">Prizes</h3>
                <div className="space-y-3 text-white/90">
                  <p>Each completed square earns you 1 point.</p>
                  <p>Each completed bingo (row, column, or diagonal) earns you 5 bonus points!</p>
                  <p className="font-medium text-white">
                    The more points you earn, the higher your chances of winning in the raffle drawing.
                  </p>
                  <div className="bg-white/10 p-3 rounded-lg mt-2">
                    <p className="text-amber-300 font-bold">Raffle Drawing: 5:00 PM at the Main Stage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => document.querySelector('[data-state="inactive"][value="login"]')?.click()}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-indigo-900 font-bold"
            >
              <div className="flex items-center gap-2">
                Ready to Play
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </TabsContent> */}
        </Tabs>
      </div>

      <footer className="text-center text-white/50 text-xs pb-4">DEMO Quest &copy; 2025 • All Rights Reserved</footer>
    </main>
  )
}

