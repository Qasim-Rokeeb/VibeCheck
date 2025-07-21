import type { Player } from '@/lib/types';

export const leaderboardData: Player[] = [
  { id: 1, name: 'Vibe Oracle', avatar: 'https://placehold.co/40x40/6666FF/FFFFFF.png?text=V', xp: 980, streak: 32, rank: 1, title: '👑 Vibe Oracle' },
  { id: 2, name: 'Streak Lord', avatar: 'https://placehold.co/40x40/3399FF/FFFFFF.png?text=S', xp: 850, streak: 28, rank: 2, title: '🔥 Streak Lord' },
  { id: 3, name: 'Vibe Sniper', avatar: 'https://placehold.co/40x40/F0F8FF/333333.png?text=V', xp: 720, streak: 15, rank: 3, title: '🎯 Vibe Sniper' },
  { id: 4, name: 'EmojiFan', avatar: 'https://placehold.co/40x40/F0F8FF/333333.png?text=E', xp: 610, streak: 10, rank: 4, title: '🌱 Newbie' },
  { id: 5, name: 'DailyGuesser', avatar: 'https://placehold.co/40x40/F0F8FF/333333.png?text=D', xp: 550, streak: 8, rank: 5, title: '🌱 Newbie' },
  { id: 6, name: 'Vibin', avatar: 'https://placehold.co/40x40/F0F8FF/333333.png?text=V', xp: 480, streak: 5, rank: 6, title: '🌱 Newbie' },
  { id: 7, name: 'Newbie', avatar: 'https://placehold.co/40x40/F0F8FF/333333.png?text=N', xp: 120, streak: 2, rank: 7, title: '🌱 Newbie' },
];

export const dailyEmojis = ['💀', '😂', '🤯', '🤡', '😎'];

// For demonstration, let's say the 2nd emoji is the winner for today.
export const winningEmoji = dailyEmojis[1];
