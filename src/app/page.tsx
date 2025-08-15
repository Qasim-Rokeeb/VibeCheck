'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/vibe-check/Header';
import { CountdownTimer } from '@/components/vibe-check/CountdownTimer';
import { EmojiSelection } from '@/components/vibe-check/EmojiSelection';
import { Results } from '@/components/vibe-check/Results';
import { AiVibeTool } from '@/components/vibe-check/AiVibeTool';
import { GameStats } from '@/components/vibe-check/GameStats';
import { Leaderboard } from '@/components/vibe-check/Leaderboard';
import { dailyEmojis, winningEmoji as mockWinningEmoji } from '@/lib/mock-data';
import { Flame, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Footer } from '@/components/vibe-check/Footer';

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({ xp: 120, streak: 2 });
  const [hasVotedToday, setHasVotedToday] = useState(false);
  const [winningEmoji, setWinningEmoji] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toDateString();
    const lastVoteDate = localStorage.getItem('vibeCheckVoteDate');
    const storedVote = localStorage.getItem('vibeCheckVoteEmoji');
    
    if (lastVoteDate === today && storedVote) {
      setHasVotedToday(true);
      setSelectedEmoji(storedVote);
      setWinningEmoji(mockWinningEmoji); // Reveal winner if already voted
    }
  }, []);

  const handleVote = (emoji: string) => {
    if (hasVotedToday) return;

    const today = new Date().toDateString();
    localStorage.setItem('vibeCheckVoteDate', today);
    localStorage.setItem('vibeCheckVoteEmoji', emoji);
    setSelectedEmoji(emoji);
    setHasVotedToday(true);
    setWinningEmoji(mockWinningEmoji);

    let xpGained = 0;
    let streakBonus = 0;

    if (emoji === mockWinningEmoji) {
      xpGained = 10;
      if (userStats.streak >= 3) {
        streakBonus = 5;
      }
      setUserStats(prev => ({
        xp: prev.xp + xpGained + streakBonus,
        streak: prev.streak + 1,
      }));
    } else {
      setUserStats(prev => ({ ...prev, streak: 0 }));
    }
    
    toast({
      title: "Vote Cast!",
      description: (
        <div className="flex flex-col">
          {emoji === mockWinningEmoji ? (
            <>
              <span className="font-bold text-green-500">You guessed correctly!</span>
              <span>
                + {xpGained} XP <Star className="inline h-4 w-4 text-yellow-400 fill-yellow-400" />
              </span>
              {streakBonus > 0 && (
                <span>
                  + {streakBonus} Bonus XP <Flame className="inline h-4 w-4 text-orange-500 fill-orange-500" />
                </span>
              )}
            </>
          ) : (
            <>
              <span className="font-bold text-destructive">Not this time!</span>
              <span>Your streak has been reset.</span>
            </>
          )}
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="bg-card-foreground/5">
                <CardTitle className="font-headline text-2xl">
                  What's the vibe today?
                </CardTitle>
                <CountdownTimer />
              </CardHeader>
              <CardContent className="p-6">
                {isClient && hasVotedToday ? (
                  <Results selectedEmoji={selectedEmoji} winningEmoji={winningEmoji} />
                ) : (
                  <EmojiSelection onVote={handleVote} emojis={dailyEmojis} />
                )}
              </CardContent>
            </Card>
            <AiVibeTool />
          </div>
          <div className="space-y-8">
            <GameStats stats={userStats} />
            <Leaderboard />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
