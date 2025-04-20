//questions + answers for startups
const boothData = [
  {
    id: "algorhythm",
    name: "Algorhythm",
    question: "What does Algorhythm primarily help marketing teams do?",
    options: [
      "A) Generate influencer campaigns",
      "B) Schedule social media posts",
      "C) Plan digital strategy for their products",
      "D) Automate email copywriting"
    ],
    correctAnswer: "C"
  },
  {
    id: "astraSomnia",
    name: "AstraSomnia",
    question: "What is the unique selling point of AstraSomnia",
    options: [
      "A) Flashcards and machine learning",
      "B) Neurocognitive science, adaptive AI tutoring, and performance analytics",
      "C) Timed practice tests and real tutors",
      "D) Gamified quizzes and chatbots"
    ],
    correctAnswer: "B"
  },
  {
    id: "crack’d",
    name: "Crack’d",
    question: "Which of the following best describes Crack’d Up?",
    options: [
      "A) High-protein scrambled egg bites",
      "B) Ready-to-drink egg white smoothies",
      "C) Dehydrated egg packets for campers",
      "D) Flavored liquid eggs for easy, nutritious breakfasts"
    ],
    correctAnswer: "D"
  },
  {
    id: "dori",
    name: "Dori",
    question: "What is Dori designed to do?",
    options: [
      "A) Track dementia progression with wearables",
      "B) Simplify care coordination for dementia caregivers",
      "C) Offer entertainment for elderly patients",
      "D) Provide dementia clinical trial opportunities"
    ],
    correctAnswer: "B"    
  },
  {
    id: "biotechBeauty",
    name: "BiotechBeauty",
    question: "What makes BiotechBeauty’s makeup unique?",
    options: [
      "A) It is water-resistant and long-lasting",
      "B) It is infused with essential oils",
      "C) It is microbiome-friendly and repairs the skin barrier",
      "D) It adjusts to your skin tone automatically"
    ],
    correctAnswer: "C"
  },
  {
    id: "bold snax",
    name: "Bold Snax",
    question: "What is Bold Snax's main value proposition?",
    options: [
      "A) Gourmet snacks imported from Europe",
      "B) Low-calorie snacks for fitness enthusiasts",
      "C) Snacks designed to help you thrive",
      "D) Sugar-free treats for children"
    ],
    correctAnswer: "B"
  },
  {
    id: "bollyStep",
    name: "BollyStep",
    question: "What does BollyStep offer to its users?",
    options: [
      "A) Bite-sized South Asian wedding dance tutorials crafted by professionals",
      "B) AI-powered choreography generation",
      "C) Bollywood dance livestream classes",
      "D) Custom playlists for wedding dances"
    ],
    correctAnswer: "A"
  },
  {
    id: "clean corps",
    name: "Clean Corps",
    question: "What problem does Clean Corps aim to solve?",
    options: [
      "A) Cleaning oceans from plastic",
      "B) Affordable methane detection",
      "C) Disinfecting public spaces uses robots",
      "D) Monitoring indoor air quality"
    ],
    correctAnswer: "B"
  },
  {
    id: "clutch",
    name: "Clutch",
    question: "What is the main use case for Clutch?",
    options: [
      "A) A social media scheduler for athletes",
      "B) A resume builder for student-athletes",
      "C) A sports gear marketplace",
      "D) A platform where players can highlight their skills for recruiters"
    ],
    correctAnswer: "D"
  },
  {
    id: "DrinkEase",
    name: "DrinkEase",
    question: "What is DrinkEase's main product?",
    options: [
      "A) Electrolyte drink for post-workout recovery",
      "B) Natural energy shot with caffeine",
      "C) Supplement to reduce hangover symptoms and support liver health",
      "D) Alcohol-free spirit alternative"
    ],
    correctAnswer: "C"   
  },
  {
    id: "deuce",
    name: "Deuce",
    question: "What does Deuce specialize in?",
    options: [
      "A) Affordable, premium-grade matcha and related products",
      "B) Energy drinks with matcha",
      "C) Japanese teaware",
      "D) Matcha-infused skincare"
    ],
    correctAnswer: "A"  
  },
  {
    id: "emPATCH",
    name: "emPATCH",
    question: "How does emPATCH relieve PMS symptoms?",
    options: [
      "A) Through a wearable device that emits heat",
      "B) With a transdermal patch containing natural ingredients",
      "C) Via a meditation app paired with supplements",
      "D) With herbal teas and diet tracking"
    ],
    correctAnswer: "B" 
  },
  {
    id: "endeavor",
    name: "Endeavor",
    question: "What does Endeavor aim to automate?",
    options: [
      "A) Customer support chatbots",
      "B) Warehouse logistics",
      "C) CRM data entry",
      "D) Sales order processing"
    ],
    correctAnswer: "D" 
  },
  {
    id: "glance",
    name: "Glance",
    question: "What is the primary function of Glance?",
    options: [
      "A) Turn work into instant progress updates to keep teams aligned",
      "B) Schedule team meetings automatically",
      "C) Manage payroll and HR benefits",
      "D) Create Gantt charts for project planning"
    ],
    correctAnswer: "A" 
  },
  {
    id: "gallery",
    name: "Gallery",
    question: "What is the core function of the Gallery platform?",
    options: [
      "A) Sell prints of your digital art",
      "B) Respond to weekly prompts through art and writing in a shared digital space",
      "C) Find professional artists for commissions",
      "D) Generate AI art based on your mood"
    ],
    correctAnswer: "B" 
  },
  {
    id: "haana",
    name: "Haana",
    question: "What is Haana Production known for at USC?",
    options: [
      "A) A student-run film criticism blog",
      "B) A campus tech hardware club",
      "C) USC’s DJ and event planning team",
      "D) Premier multi-genre music and video production group"
    ],
    correctAnswer: "D" 
  },
  {
    id: "happyworks",
    name: "HappyWorks",
    question: "What does HappyWorks combine to drive innovation in daily-use products?",
    options: [
      "A) Ergonomics and AI",
      "B) Design and mechanical engineering",
      "C) Marketing and rapid physical product development",
      "D) User testing and logistics"
    ],
    correctAnswer: "C" 
  },
  {
    id: "hoontos",
    name: "Hoontos",
    question: "How does Hoontos help combat student loneliness?",
    options: [
      "A) Daily check-in messages for mental health",
      "B) Events and virtual speed friending",
      "C) College meme feed and group chats",
      "D) AI psychographic agent that helps students connect and move conversations offline"
    ],
    correctAnswer: "D" 
  },
  {
    id: "impeccable chicken",
    name: "Impeccable Chicken",
    question: "What problem is Impeccable Chicken trying to solve?",
    options: [
      "A) The need for a tastier alternative to protein bars and meal prep",
      "B) Lack of vegan-friendly snacks",
      "C) Chicken wings that lack spice",
      "D) Limited late-night delivery options"
    ],
    correctAnswer: "A" 
  },
  {
    id: "impulse control",
    name: "Impulse Control",
    question: "What does Impulse Control offer developers?",
    options: [
      "A) Real-time structural failure simulation for interactive environments",
      "B) Faster character animation rendering",
      "C) Modular controller input libraries",
      "D) VR motion capture hardware"
    ],
    correctAnswer: "A" 
  },
  {
    id: "intuition intelligence",
    name: "Intuition Intelligence",
    question: "What issue does Intuition Intelligence address in Gen AI content?",
    options: [
      "A) Too much visual noise",
      "B) Slow inference times",
      "C) La",
      "D) VR motion capture hardware"
    ],
    correctAnswer: "A" 
  },
  {
    id: "linnko",
    name: "Linnko",
    question: "What is Linnko's main purpose?",
    options: [
      "A) Social media management for brands",
      "B) A marketplace connecting brands and creators for collaborations",
      "C) Digital advertising platform for influencers",
      "D) Content creation tools for marketers"
    ],
    correctAnswer: "B"
  },
  {
    id: "mark",
    name: "Mark",
    question: "What makes Mark unique as a bookmark?",
    options: [
      "A) It's made from sustainable materials",
      "B) It has built-in page highlighting features",
      "C) It merges physical, digital and audio book reading experiences",
      "D) It tracks reading habits and provides analytics"
    ],
    correctAnswer: "C"
  },
  {
    id: "memoir photos",
    name: "Memoir Photos",
    question: "Who is Memoir Photos specifically designed for?",
    options: [
      "A) Professional photographers",
      "B) The visually impaired",
      "C) Social media influencers",
      "D) Memory preservation enthusiasts"
    ],
    correctAnswer: "B"
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

