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

//export bingo card
export const staticBingoCard = Array.from({ length: 25 }, (_, i) => {
  if (i === 12) return null //free space
  const boothIndex = i > 12 ? i - 1 : i
  const booth = boothData[boothIndex]
  return {
    ...booth,
    id: i, //0-11, 13-24
  }
})

