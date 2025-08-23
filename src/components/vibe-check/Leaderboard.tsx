
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { leaderboardData } from '@/lib/mock-data';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RankBadge } from './RankBadge';
import type { Player } from '@/lib/types';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
  const [isCompact, setIsCompact] = useState(true);
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  const playersToShow = isCompact ? leaderboardData.slice(0, 3) : leaderboardData;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Trophy className="text-primary" />
            VibeBoard
          </CardTitle>
          <CardDescription>Top players for {currentMonthName}.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="compact-leaderboard" className="text-sm font-medium text-muted-foreground">
            Compact
          </Label>
          <Switch
            id="compact-leaderboard"
            checked={isCompact}
            onCheckedChange={setIsCompact}
          />
        </div>
      </CardHeader>
      <CardContent>
        <motion.div layout className="space-y-4">
          {playersToShow.map((player, index) => (
            <motion.div
              key={player.id}
              layout
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
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
