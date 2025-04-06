# DEMO Quest: Project Plan
## Project Description
DEMO Quest is a lightweight, mobile-friendly web app for DEMO attendees to explore booths and win prizes. Each attendee gets a randomized bingo card with startup booths. To check off a square, they must input a fun fact or answer a custom question about that startup.
Attendees earn points for each completed square. More points = higher chance at raffle prizes. This game increases booth engagement, learning, and energy across the event floor.

## Goals
Increase foot traffic across all booths.


Encourage meaningful conversations with startup founders.


Make DEMO feel fun, interactive, and high-energy.


Reward attendees with a live leaderboard and raffle prizes.



## Core Features
* Bingo Card Generator
** Unique randomized card per attendee (5x5 or smaller).
** Squares feature booth name + question prompt.


* 2. Fun Fact Submission
** Tap a square → see question → submit an answer.
** Answers stored in DB, some reviewed for raffle eligibility.


* 3. Leaderboard
** Each square = 1 point.
** Live points-based leaderboard visible to all.


* 4. Raffle System
** Top point-earners entered into a raffle.
** Bonus entries for completing a bingo (row, col, diagonal).



## Tech Stack
 - Frontend: Next.js + Tailwind CSS
 - Backend: Supabase (DB + Auth)
 - Hosting: Vercel
 - Auth: Email
 - Bonus: Admin dashboard for raffle drawing



## Task Sign-Up Sheet
Please write your name next to any task you want to take on.
Project Setup & DevOps
Set up Next.js + deploy on Vercel


## Firebase or Supabase setup (Auth + DB)

 ✍️ Taken by: __________Shane Yokota, Mustafa Nomair


## Frontend
Bingo card UI + responsive grid


Answer submission modal with question prompts


Leaderboard page (live points view)


Raffle results page
 ✍️ Taken by: __________ Shubhayan Srivastava


## Backend
Card generation + assignment per user


Store user responses + calculate points


Raffle logic + winner picker tool
 ✍️ Taken by: __________


## Testing + QA
Seed sample booth data + questions


Test UI/UX flows across devices


Admin dashboard / tools for monitoring
 ✍️ Taken by: __________ Siddarth




## Notes
Build this out by 4/18 so we can have a few days of testing.
Booth prompts can be stored in JSON or DB, e.g.:


{
  "booth_id": "keepsake",
  "name": "Keepsake",
  "question": "What’s the most unique use case they’ve seen?",
  "fun_fact": "They were founded by two USC alumni."
}

Optional: Add a bonus square for taking a selfie with a founder.
