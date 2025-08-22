
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star, Snowflake } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type GameStatsProps = {
  stats: {
    xp: number;
    streak: number;
    lastStreakFreeze: Date | null;
  };
  isStreakFreezeAvailable: boolean;
};

// Simple level calculation for demonstration
const calculateLevel = (xp: number) => {
  const level = Math.floor(Math.sqrt(xp / 10)) + 1;
  const nextLevelXP = Math.pow(level, 2) * 10;
  const currentLevelXP = Math.pow(level - 1, 2) * 10;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return { level, progress, nextLevelXP };
};

const streakMilestones = [3, 7, 14, 30, 50, 75, 100];

const calculateStreak = (streak: number) => {
  // If streak is 100 or more, the next milestone is prestige
  if (streak >= 100) {
    return { milestoneProgress: 100, nextMilestone: "Prestige!" };
  }
  const nextMilestone = streakMilestones.find(m => streak < m) || streakMilestones[streakMilestones.length -1];
  const previousMilestone = streakMilestones.slice().reverse().find(m => m <= streak) || 0;

  // Avoid division by zero if current streak is a milestone
  const totalSteps = nextMilestone - previousMilestone;
  const currentSteps = streak - previousMilestone;
  const milestoneProgress = totalSteps > 0 ? (currentSteps / totalSteps) * 100 : 100;

  return { milestoneProgress, nextMilestone };
};


export function GameStats({ stats, isStreakFreezeAvailable }: GameStatsProps) {
  const { level, progress, nextLevelXP } = calculateLevel(stats.xp);
  const { milestoneProgress, nextMilestone } = calculateStreak(stats.streak);

  const nextFreezeDate = stats.lastStreakFreeze ? new Date(stats.lastStreakFreeze) : null;
  if (nextFreezeDate) {
    nextFreezeDate.setDate(nextFreezeDate.getDate() + 7);
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-muted-foreground text-sm">
            <span className="font-semibold">Level {level}</span>
            <span className="font-semibold text-foreground">{stats.xp} / {nextLevelXP} XP</span>
          </div>
          <Progress value={progress} aria-label={`${progress.toFixed(0)}% to next level`} />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold">Current Streak</span>
                </div>
                <span className="font-semibold text-foreground">{stats.streak} Days</span>
            </div>
            <Progress value={milestoneProgress} className="[&>div]:bg-orange-500" aria-label={`Streak progress: ${milestoneProgress.toFixed(0)}%`} />
            <p className="text-xs text-muted-foreground text-right">
              {typeof nextMilestone === 'number' ? `Next bonus at ${nextMilestone} days!` : nextMilestone}
            </p>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                    <Snowflake className={cn("h-4 w-4", isStreakFreezeAvailable ? "text-blue-400" : "text-muted-foreground")} />
                    <span className="font-semibold">Streak Freeze</span>
                </div>
                <span className={cn("font-semibold", isStreakFreezeAvailable ? "text-green-500" : "text-muted-foreground")}>
                    {isStreakFreezeAvailable ? 'Available' : 'Unavailable'}
                </span>
            </div>
            <div className="text-xs text-muted-foreground text-right">
                {isStreakFreezeAvailable ? (
                    "Use it before voting to protect your streak!"
                ) : (
                    `Next available on ${nextFreezeDate?.toLocaleDateString()}`
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
