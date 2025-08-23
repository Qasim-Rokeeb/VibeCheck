
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { leaderboardData } from '@/lib/mock-data';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RankBadge } from './RankBadge';
import type { Player } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

const rankStyles = {
  1: 'bg-yellow-400/20 border-yellow-500/50',
  2: 'bg-gray-400/20 border-gray-500/50',
  3: 'bg-amber-600/20 border-amber-700/50',
};

const rankTextStyles = {
  1: 'text-yellow-500',
  2: 'text-gray-400',
  3: 'text-amber-700',
};

// Helper to determine rank from XP
const getRankTitle = (xp: number): Player['title'] => {
    if (xp >= 900) return 'Vibe Oracle';
    if (xp >= 800) return 'Streak Lord';
    if (xp >= 700) return 'Vibe Sniper';
    return 'Newbie';
}


export function Leaderboard() {
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Trophy className="text-primary" />
          VibeBoard
        </CardTitle>
        <CardDescription>Top players for {currentMonthName}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((player, index) => (
            <Link href={`/profile/${player.id}`} key={player.id} className="block">
                <motion.div
                  layoutId={`leaderboard-item-${player.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-lg transition-colors bg-card hover:bg-secondary/50 border',
                    rankStyles[player.rank as keyof typeof rankStyles] || 'border-transparent'
                  )}
                >
                  <div className={cn(
                      "flex items-center justify-center w-8 h-8 font-bold text-lg rounded-full",
                       rankTextStyles[player.rank as keyof typeof rankStyles]
                    )}>
                    {player.rank}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="avatar" />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold text-card-foreground">{player.name}</p>
                    <RankBadge title={getRankTitle(player.xp)} />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{player.xp}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </motion.div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
