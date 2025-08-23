
export type RankTitle = 'Vibe Oracle' | 'Streak Lord' | 'Vibe Sniper' | 'Newbie';

export type Player = {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  rank: number;
  title: RankTitle;
};

export type VoteHistory = {
    date: string;
    guess: string;
    winner: string;
};

    