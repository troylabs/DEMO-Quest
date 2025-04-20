//questions + answers for startups
const boothData = [
  {
    id: "nuri",
    name: "Nuri",
    question: "What is Nuri?",
    options: [
      "A) A plant-based meal delivery service",
      "B) A clean, plant-powered energy drink inspired by Asian flavors",
      "C) A sustainable clothing brand",
      "D) A meditation app with Asian-inspired sounds"
    ],
    correctAnswer: "B"
  },
  {
    id: "p1",
    name: "P1",
    question: "What does P1 offer?",
    options: [
      "A) A three-step under one-minute sink-free skincare routine for athletic people on the go",
      "B) Performance-enhancing supplements for athletes",
      "C) Waterproof athletic gear",
      "D) A fitness tracking app for professional athletes"
    ],
    correctAnswer: "A"
  },
  {
    id: "phynite",
    name: "Phynite",
    question: "What does Phynite do?",
    options: [
      "A) Create digital collectibles as NFTs",
      "B) Authenticate rare collectibles",
      "C) Make custom mystery items for collectibles sellers",
      "D) Provide insurance for valuable collectibles"
    ],
    correctAnswer: "C"
  },
  {
    id: "playbook3d",
    name: "Playbook 3D",
    question: "What is Playbook 3D?",
    options: [
      "A) A 3D printing service",
      "B) A platform for creative professionals and enthusiasts to use AI tools",
      "C) A 3D modeling software for architects",
      "D) A game development engine"
    ],
    correctAnswer: "B"
  },
  {
    id: "prayTogether",
    name: "PrayTogether",
    question: "What is PrayTogether?",
    options: [
      "A) A religious text study app",
      "B) A church finder service",
      "C) A mobile app uniting people in prayer by making it easy to share, organize, and support each other",
      "D) A meditation timer with religious themes"
    ],
    correctAnswer: "C"
  },
  {
    id: "resonance",
    name: "Resonance",
    question: "What does Resonant create?",
    options: [
      "A) Sound healing devices",
      "B) Conversational voice AI that automates customer research interviews",
      "C) Music production software",
      "D) Acoustic panels for home studios"
    ],
    correctAnswer: "B"
  },
  {
    id: "rexiSelfCare",
    name: "Rexi Self-Care",
    question: "What is Rexi Self-Care's mission?",
    options: [
      "A) To provide luxury spa products",
      "B) To create personalized fitness routines",
      "C) To empower women through meaningful daily rituals rooted in mindfulness",
      "D) To offer virtual therapy sessions"
    ],
    correctAnswer: "C"
  },
  {
    id: "sensiply",
    name: "Sensiply",
    question: "How does Sensiply help businesses?",
    options: [
      "A) By providing employee wellness programs",
      "B) By putting a face to every resume using AI and video pitches to help high turnover businesses hire faster",
      "C) By offering customer satisfaction surveys",
      "D) By creating virtual team-building activities"
    ],
    correctAnswer: "B"
  },
  {
    id: "sequentAI",
    name: "Sequent AI",
    question: "What do Sequent AI's agents automate?",
    options: [
      "A) Marketing campaigns",
      "B) Software development",
      "C) 90-100% of all customer success",
      "D) Financial reporting"
    ],
    correctAnswer: "C"
  },
  {
    id: "spine",
    name: "Spine",
    question: "What is Spine (Previously Digitag)?",
    options: [
      "A) A posture correction device",
      "B) A document management system",
      "C) An AI-powered NFC-enabled software solution for SMB's entire inventory lifecycle",
      "D) A digital tagging system for social media"
    ],
    correctAnswer: "C"
  },
  {
    id: "stringerNews",
    name: "Stringer News",
    question: "What is Stringer News doing?",
    options: [
      "A) Creating a news aggregator app",
      "B) Reinventing the News with Stringer",
      "C) Providing journalism courses",
      "D) Fact-checking other news sources"
    ],
    correctAnswer: "B"
  },
  {
    id: "swsh",
    name: "SWSH",
    question: "What does SWSH offer?",
    options: [
      "A) A laundry service app",
      "B) A water conservation system",
      "C) The easiest way to share photos with friends and strangers with shared experiences",
      "D) A swimming lesson platform"
    ],
    correctAnswer: "C"
  },
  {
    id: "tally",
    name: "Tally",
    question: "What is Tally?",
    options: [
      "A) A budgeting app",
      "B) AI inventory management agent for SMBs",
      "C) A customer loyalty program",
      "D) A vote counting system"
    ],
    correctAnswer: "B"
  },
  {
    id: "theSittingRoom",
    name: "The Sitting Room",
    question: "What is The Sitting Room building?",
    options: [
      "A) Co-working spaces",
      "B) Ergonomic office furniture",
      "C) The go-to workwear brand for post-grad women",
      "D) Home office design services"
    ],
    correctAnswer: "C"
  },
  {
    id: "thriftSC",
    name: "ThriftSC",
    question: "What is ThriftSC?",
    options: [
      "A) A thrift store locator app",
      "B) A full-service resale platform connecting USC sellers with USC buyers",
      "C) A clothing donation service",
      "D) A vintage clothing authentication service"
    ],
    correctAnswer: "B"
  },
  {
    id: "ticVision",
    name: "TicVision",
    question: "What does TicVision do?",
    options: [
      "A) Provide video tutorials for programming",
      "B) Offer virtual reality therapy",
      "C) Transform Tourette Syndrome care by connecting patient tic tracking with clinical insights",
      "D) Create educational content about neurological conditions"
    ],
    correctAnswer: "C"
  },
  {
    id: "treffa",
    name: "Treffa",
    question: "What does Treffa offer?",
    options: [
      "A) Dating services",
      "B) Restaurant recommendations",
      "C) Shopping made effortless",
      "D) Travel planning assistance"
    ],
    correctAnswer: "C"
  },
  {
    id: "tackleBox",
    name: "Tackle Box",
    question: "What is TackleBox?",
    options: [
      "A) A fishing equipment subscription box",
      "B) A gamified timer device that creates a distraction-free work environment for students",
      "C) A toolbox organization system",
      "D) A tackle storage solution for fishermen"
    ],
    correctAnswer: "B"
  },
  {
    id: "uniVibeEssentials",
    name: "UniVibe Essentials",
    question: "What does UniVibe Essentials deliver?",
    options: [
      "A) Curated college starter packs for dorm move-in",
      "B) Monthly subscription boxes of college essentials",
      "C) Custom university-branded merchandise",
      "D) Textbook rental services"
    ],
    correctAnswer: "A"
  },
  {
    id: "veyra",
    name: "Veyra",
    question: "What service does Veyra provide?",
    options: [
      "A) Health insurance comparison",
      "B) Medical appointment scheduling",
      "C) Identifies errors in medical bills and automates the disputing process",
      "D) Prescription delivery service"
    ],
    correctAnswer: "C"
  },
  {
    id: "viva",
    name: "Viva",
    question: "What does Viva do?",
    options: [
      "A) Provide virtual assistant services",
      "B) Make subleasing your place fast & painless",
      "C) Offer home cleaning services",
      "D) Create smart home automation solutions"
    ],
    correctAnswer: "B"
  },
  {
    id: "udayElectric",
    name: "Uday Electric",
    question: "What does Uday Electric provide?",
    options: [
      "A) Solar panel installation services",
      "B) Electric vehicle charging stations",
      "C) Affordable, uninterrupted energy solutions for communities in developing countries",
      "D) Electrical repair services"
    ],
    correctAnswer: "C"
  }
  ]
  
  //export bingo card
  export const staticBingoCard = Array.from({ length: 25 }, (_, i) => {
    const boothIndex = i
    const booth = boothData[boothIndex]
    return {
      ...booth,
      id: i, //0-11, 13-24
    }
  })
  
  