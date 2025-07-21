
# 🎯 VibeCheck

**VibeCheck** is a social, addictive, and daily-playable emoji-guessing game built as a **Farcaster Frame**. Each day, users guess the emoji that best captures the "vibe" of the community. One vote. One shot. Guess right, and rise up the leaderboard!

> _"It’s like Wordle, but for social sentiment."_


---

## 🧠 Game Overview

- Users are shown **5 emoji options** every day.
- You can **vote once per day** on the emoji you think best represents the community’s vibe.
- The emoji with the most total votes becomes the “**official vibe**” at 00:00 UTC the next day.
- Users who guessed the correct emoji gain **XP** and maintain their **streak**.
- A **global leaderboard** ("VibeBoard") shows the top players.

---



## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js (App Router)](https://nextjs.org/) | Frontend framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Farcaster Frames SDK](https://docs.farcaster.xyz/) | Frame interaction inside casts |
| [Supabase](https://supabase.com/) *(Optional)* | Backend storage for votes and leaderboard |
| [Vercel](https://vercel.com/) | Deployment & edge hosting |

---

## 📦 Features

- ✅ Farcaster Frame integration
- ✅ Emoji voting system (1 per day)
- ✅ Daily vibe reveal
- ✅ XP system + streak counter
- ✅ Leaderboard (VibeBoard)
- ✅ Cast-based sharing
- ✅ Mobile-first responsive UI

---

## 🧩 Game Logic

- Voting is allowed once per day per Farcaster FID
- The winning emoji is determined based on vote count
- Votes reset every 24 hours (UTC)
- XP earned for correct guesses
- Daily streaks increase engagement
- All game state is frontend-based or stored via Supabase

---

## 📂 Project Structure

```
vibecheck/
│
├── app/                  # App Router Pages
│   └── frame/            # Frame endpoint (frame.html, OG metadata)
├── components/           # Reusable UI components (EmojiCard, VoteButton, etc.)
├── lib/                  # Utility functions (e.g. Farcaster helpers, streak logic)
├── public/               # Static assets (screenshots, favicon)
├── styles/               # Tailwind config and global styles
├── utils/                # XP, emoji pool, leaderboard helpers
├── .env.local            # Environment variables
└── README.md             # This file
```

---

## 🧪 Running Locally

```bash
# Clone the repo
git clone https://github.com/qasim-rokeeb/vibecheck.git
cd vibecheck

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in your Supabase/Farcaster keys if using a backend

# Start development server
npm run dev

# Visit the app
http://localhost:3000
```

---

## ⚙️ Environment Variables

Create a `.env.local` file and include:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> You can also run it 100% frontend-only by skipping Supabase and using local state or Farcaster-only FIDs.

---

## 🧠 Gamification System

| Action             | XP Awarded |
|--------------------|------------|
| Correct Guess      | 10 XP      |
| Daily Streak Bonus | +5 XP      |
| Shared Cast        | +2 XP      |
| Missed a Day       | Streak Resets |

Ranks unlock fun titles:
- 🌱 Newbie
- 🎯 Vibe Sniper
- 🔥 Streak Lord
- 🧠 Vibe Oracle

---

## 🧩 Farcaster Frame Integration

- Uses `@farcaster/core` and `frames.js` for frame protocol
- Custom OG image + `frame.html` for buttons and response
- Frame buttons include:
  - “Vote for 💀”
  - “Vote for 😂”
  - “Cast Your Vibe”

---

## 🧠 Future Improvements

- Emoji Suggestion by Users
- IPFS-based vote transparency
- Vibe NFTs for long streaks
- Reaction-based voting via Casts
- Dark mode toggle
- Seasonal leaderboards

---

## 📜 License

MIT License. Free to fork, remix, and use!

---

## 🤝 Contributing

Feel free to open issues or PRs! Ideal contributions include:
- UI improvements
- Animation polish
- Better emoji pool
- Leaderboard enhancements

---

## 🧵 Credits

- Built with ❤️ by [@yourhandle](https://warpcast.com/thecodinggeek)
- Powered by [Farcaster](https://www.farcaster.xyz/)
- Emoji set inspired by community vibes 😎
---

## 🙋‍♂️ Questions or Feedback?

Ping me on [Warpcast](https://warpcast.com/) or [Twitter](https://twitter.com/) — let’s vibe 🔥

```
