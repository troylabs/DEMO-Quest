// Mock data for startup booths
const boothData = [
  {
    id: "keepsake",
    name: "Keepsake",
    question: "What's the most unique use case they've seen?",
    fun_fact: "They were founded by two USC alumni.",
  },
  {
    id: "vercel",
    name: "Vercel",
    question: "What makes their deployment platform unique?",
    fun_fact: "They created Next.js, a popular React framework.",
  },
  {
    id: "supabase",
    name: "Supabase",
    question: "How does their product compare to Firebase?",
    fun_fact: "They're an open source alternative to Firebase.",
  },
  {
    id: "stripe",
    name: "Stripe",
    question: "What new payment feature are they most excited about?",
    fun_fact: "Their first product name was /dev/payments.",
  },
  {
    id: "figma",
    name: "Figma",
    question: "What's their most popular plugin?",
    fun_fact: "They were acquired by Adobe for $20 billion.",
  },
  {
    id: "notion",
    name: "Notion",
    question: "What's their most requested feature?",
    fun_fact: "They started as a hardware company called Canopy.",
  },
  {
    id: "linear",
    name: "Linear",
    question: "How do they differentiate from other project management tools?",
    fun_fact: "Their CEO previously worked at Uber and Airbnb.",
  },
  {
    id: "replicate",
    name: "Replicate",
    question: "What's the most creative AI model on their platform?",
    fun_fact: "They make it easy to run machine learning models in the cloud.",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    question: "What makes Claude different from other AI assistants?",
    fun_fact: "They focus on AI safety and responsible AI development.",
  },
  {
    id: "replit",
    name: "Replit",
    question: "What's their most popular programming language?",
    fun_fact: "They started as a simple REPL for JavaScript.",
  },
  {
    id: "planetscale",
    name: "PlanetScale",
    question: "How does their database handle scaling?",
    fun_fact: "Their technology is based on Vitess, which powers YouTube's database.",
  },
  {
    id: "loom",
    name: "Loom",
    question: "What industry uses their product the most?",
    fun_fact: "They've recorded over 100 million videos.",
  },
  {
    id: "retool",
    name: "Retool",
    question: "What's the most complex app built with their platform?",
    fun_fact: "They help companies build internal tools quickly.",
  },
  {
    id: "railway",
    name: "Railway",
    question: "What's their most deployed type of application?",
    fun_fact: "They aim to make deployment as simple as a git push.",
  },
  {
    id: "cal",
    name: "Cal.com",
    question: "What's their most unique scheduling feature?",
    fun_fact: "They're an open source alternative to Calendly.",
  },
  {
    id: "clerk",
    name: "Clerk",
    question: "What authentication method do most of their customers use?",
    fun_fact: "They provide authentication and user management as a service.",
  },
  {
    id: "resend",
    name: "Resend",
    question: "What makes their email API different?",
    fun_fact: "They were founded by ex-Vercel employees.",
  },
  {
    id: "dub",
    name: "Dub",
    question: "What's their most popular link shortening feature?",
    fun_fact: "They're an open source link shortener with analytics.",
  },
  {
    id: "raycast",
    name: "Raycast",
    question: "What's their most downloaded extension?",
    fun_fact: "They're building a productivity tool to replace Spotlight on Mac.",
  },
  {
    id: "remotion",
    name: "Remotion",
    question: "What's the most creative video made with their platform?",
    fun_fact: "They let you create videos programmatically with React.",
  },
  {
    id: "framer",
    name: "Framer",
    question: "How are people using their AI features?",
    fun_fact: "They evolved from a prototyping tool to a full website builder.",
  },
  {
    id: "cron",
    name: "Cron",
    question: "What calendar feature do users love most?",
    fun_fact: "They're building a next-generation calendar app.",
  },
  {
    id: "arc",
    name: "Arc",
    question: "What's their most unique browser feature?",
    fun_fact: "They're reimagining the web browser for the first time in decades.",
  },
  {
    id: "reflect",
    name: "Reflect",
    question: "How does their note-taking approach differ from others?",
    fun_fact: "They use a bidirectional linking system for notes.",
  },
]

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate a 5x5 bingo card with randomized booths
export function generateBingoCard() {
  const shuffledBooths = shuffleArray(boothData)
  const card = []

  // Take the first 24 booths (5x5 = 25, with middle as free space)
  for (let i = 0; i < 25; i++) {
    // Middle square is a free space
    if (i === 12) {
      card.push(null)
    } else {
      const boothIndex = i > 12 ? i - 1 : i
      card.push(shuffledBooths[boothIndex])
    }
  }

  return card
}

// Check if the player has a bingo (row, column, or diagonal)
export function checkForBingo(card, completedBoothIds) {
  const bingoLines = []

  // Convert the card to a 5x5 grid of completed status (true/false)
  const grid = []
  for (let i = 0; i < 5; i++) {
    const row = []
    for (let j = 0; j < 5; j++) {
      const index = i * 5 + j
      const booth = card[index]
      // Middle is free space (always completed)
      if (index === 12) {
        row.push(true)
      } else {
        row.push(booth && completedBoothIds.includes(booth.id))
      }
    }
    grid.push(row)
  }

  // Check rows
  for (let i = 0; i < 5; i++) {
    if (grid[i].every((cell) => cell)) {
      bingoLines.push([i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4])
    }
  }

  // Check columns
  for (let j = 0; j < 5; j++) {
    if (grid.every((row) => row[j])) {
      bingoLines.push([j, j + 5, j + 10, j + 15, j + 20])
    }
  }

  // Check diagonal (top-left to bottom-right)
  if (grid[0][0] && grid[1][1] && grid[2][2] && grid[3][3] && grid[4][4]) {
    bingoLines.push([0, 6, 12, 18, 24])
  }

  // Check diagonal (top-right to bottom-left)
  if (grid[0][4] && grid[1][3] && grid[2][2] && grid[3][1] && grid[4][0]) {
    bingoLines.push([4, 8, 12, 16, 20])
  }

  return {
    hasBingo: bingoLines.length > 0,
    lines: bingoLines,
  }
}

