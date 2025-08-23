
'use client';

import type { Player } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RankBadge } from './RankBadge';
import { ArrowLeft, Flame, Star, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import Link from 'next/link';

// Helper to determine rank from XP
const getRankTitle = (xp: number): Player['title'] => {
    if (xp >= 900) return 'Vibe Oracle';
    if (xp >= 800) return 'Streak Lord';
    if (xp >= 700) return 'Vibe Sniper';
    return 'Newbie';
};

const calculateLevel = (xp: number) => {
  const level = Math.floor(Math.sqrt(xp / 10)) + 1;
  const nextLevelXP = Math.pow(level, 2) * 10;
  const currentLevelXP = Math.pow(level - 1, 2) * 10;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  return { level, progress, nextLevelXP, currentLevelXP };
};

const streakMilestones = [3, 7, 14, 30, 50, 75, 100];

const calculateStreak = (streak: number) => {
    if (streak >= 100) return { milestoneProgress: 100, nextMilestone: "Prestige!" };
    const nextMilestone = streakMilestones.find(m => streak < m) || streakMilestones[streakMilestones.length - 1];
    const previousMilestone = streakMilestones.slice().reverse().find(m => m <= streak) || 0;
    const totalSteps = nextMilestone - previousMilestone;
    const currentSteps = streak - previousMilestone;
    const milestoneProgress = totalSteps > 0 ? (currentSteps / totalSteps) * 100 : 100;
    return { milestoneProgress, nextMilestone };
};

type PlayerProfileProps = {
  player: Player;
};

export function PlayerProfile({ player }: PlayerProfileProps) {
  const { level, progress, nextLevelXP, currentLevelXP } = calculateLevel(player.xp);
  const { milestoneProgress, nextMilestone } = calculateStreak(player.streak);
  const rankTitle = getRankTitle(player.xp);

  return (
    <div className="space-y-8">
        <Link href="/#leaderboard" legacyBehavior>
            <Button variant="outline" className="gap-2">
                <ArrowLeft />
                Back to VibeBoard
            </Button>
        </Link>
        <Card className="shadow-2xl overflow-hidden">
            <div className="bg-card-foreground/5 p-8 relative">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                        <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="avatar" />
                        <AvatarFallback className="text-4xl">{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-4xl font-bold font-headline">{player.name}</h1>
                        <RankBadge title={rankTitle} />
                    </div>
                </div>
            </div>
            <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Star className="text-yellow-400 fill-yellow-400" /> XP & Level</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-primary">{player.xp.toLocaleString()}</p>
                            <p className="text-muted-foreground">Total XP</p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                                <span className="font-bold text-lg">Level {level}</span>
                                <span className="text-sm text-muted-foreground">{player.xp}/{nextLevelXP} XP</span>
                            </div>
                            <Progress value={progress} />
                            <p className="text-xs text-muted-foreground">{nextLevelXP - player.xp} XP to next level</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Flame className="text-orange-500" /> Streak</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-orange-500">{player.streak}</p>
                            <p className="text-muted-foreground">Day Streak</p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between items-baseline">
                                <span className="font-bold text-lg">Next Milestone</span>
                                <span className="text-sm text-muted-foreground">{player.streak} / {typeof nextMilestone === 'number' ? nextMilestone : '100+'}</span>
                            </div>
                            <Progress value={milestoneProgress} className="[&>div]:bg-orange-500" />
                            <p className="text-xs text-muted-foreground">
                                {typeof nextMilestone === 'number' ? `${nextMilestone - player.streak} days to next bonus!` : 'Prestige!'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    </div>
  );
}
