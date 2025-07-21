import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star } from 'lucide-react';
import { Progress } from '../ui/progress';

type GameStatsProps = {
  stats: {
    xp: number;
    streak: number;
  };
};

// Simple level calculation for demonstration
const calculateLevel = (xp: number) => {
  const level = Math.floor(Math.sqrt(xp / 10)) + 1;
  const nextLevelXP = Math.pow(level, 2) * 10;
  const currentLevelXP = Math.pow(level - 1, 2) * 10;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return { level, progress };
};


export function GameStats({ stats }: GameStatsProps) {
  const { level, progress } = calculateLevel(stats.xp);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-muted-foreground text-sm">
            <span>Level {level}</span>
            <span className="font-semibold text-foreground">{stats.xp} XP</span>
          </div>
          <Progress value={progress} aria-label={`${progress}% to next level`} />
        </div>

        <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <div className="flex items-end justify-center gap-2">
                <span className="text-4xl font-bold font-headline text-primary">{stats.streak}</span>
                <Flame className="h-8 w-8 text-orange-400 mb-1" />
              </div>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}
