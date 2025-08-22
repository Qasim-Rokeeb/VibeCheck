
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
import { Award, Flame, Star, Vote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/vibe-check/Footer';
import Confetti from 'react-confetti';
import { BottomNav } from '@/components/vibe-check/BottomNav';
import { seededShuffle } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    xp: 120,
    streak: 2,
    lastStreakFreeze: null as Date | null,
  });
  const [hasVotedToday, setHasVotedToday] = useState(false);
  const [winningEmoji, setWinningEmoji] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [useStreakFreeze, setUseStreakFreeze] = useState(false);
  const [shuffledEmojis, setShuffledEmojis] = useState<string[]>([]);
  const [showStreakLossModal, setShowStreakLossModal] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const todayString = today.toDateString();
    
    const lastVoteDateStr = localStorage.getItem('vibeCheckVoteDate');
    const storedVote = localStorage.getItem('vibeCheckVoteEmoji');
    const storedUserStatsStr = localStorage.getItem('vibeCheckUserStats');

    // Shuffle emojis daily for all users consistently
    setShuffledEmojis(seededShuffle(dailyEmojis, todayString));

    if (storedUserStatsStr) {
      const parsedStats = JSON.parse(storedUserStatsStr);
      const currentStats = {
        ...parsedStats,
        lastStreakFreeze: parsedStats.lastStreakFreeze ? new Date(parsedStats.lastStreakFreeze) : null,
      };

      if (lastVoteDateStr) {
        const lastVoteDate = new Date(lastVoteDateStr);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (lastVoteDate.toDateString() !== todayString && lastVoteDate.toDateString() !== yesterday.toDateString()) {
           if (currentStats.streak > 0) {
              setShowStreakLossModal(true);
              const newStats = { ...currentStats, streak: 0 };
              setUserStats(newStats);
              localStorage.setItem('vibeCheckUserStats', JSON.stringify(newStats));
            }
        }
      } else if (currentStats.streak > 0) {
        // If there are stats but no vote date, it implies a missed day from a previous session.
        setShowStreakLossModal(true);
        const newStats = { ...currentStats, streak: 0 };
        setUserStats(newStats);
        localStorage.setItem('vibeCheckUserStats', JSON.stringify(newStats));
      }
       if (lastVoteDateStr === todayString && storedVote) {
        setHasVotedToday(true);
        setSelectedEmoji(storedVote);
        setWinningEmoji(mockWinningEmoji); // Reveal winner if already voted
      }
      setUserStats(currentStats);
    }


    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('vibeCheckUserStats', JSON.stringify(userStats));
    }
  }, [userStats, isClient]);


  const handleVote = (emoji: string) => {
    if (hasVotedToday) return;

    const voteDate = new Date();
    localStorage.setItem('vibeCheckVoteDate', voteDate.toDateString());
    localStorage.setItem('vibeCheckVoteEmoji', emoji);
    setSelectedEmoji(emoji);
    setHasVotedToday(true);
    setWinningEmoji(mockWinningEmoji);

    let xpGained = 0;
    let streakBonus = 0;
    let firstVoteBonus = 2; // Bonus for voting
    let isWeekendBonus = false;
    let toastDescription: React.ReactNode;
    let newStats = { ...userStats };
    const currentStreak = userStats.streak;

    if (emoji === mockWinningEmoji) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Confetti for 5 seconds

      xpGained = 10;
      const dayOfWeek = voteDate.getDay(); // Sunday = 0, Saturday = 6
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        xpGained *= 2;
        isWeekendBonus = true;
      }
      
      if (currentStreak >= 3) {
        streakBonus = 5;
      }

      const newStreak = currentStreak + 1;

      if (newStreak === 100) {
        // Prestige reset!
        const prestigeBonus = 1000;
        newStats = {
          ...userStats,
          xp: userStats.xp + xpGained + streakBonus + firstVoteBonus + prestigeBonus,
          streak: 0, // Reset streak
        };
        toastDescription = (
            <>
                <span className="font-bold text-primary text-lg flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    PRESTIGE!
                </span>
                <span>You reached a 100-day streak! It resets now, but you've earned a huge bonus.</span>
                <span>
                    + {prestigeBonus} XP <Star className="inline h-4 w-4 text-yellow-400 fill-yellow-400" /> (Prestige Bonus)
                </span>
            </>
        );
      } else {
        newStats = {
          ...userStats,
          xp: userStats.xp + xpGained + streakBonus + firstVoteBonus,
          streak: newStreak,
        };
        
        toastDescription = (
          <>
            <span className="font-bold text-green-500">You guessed correctly!</span>
            <span>
              + {firstVoteBonus} XP <Vote className="inline h-4 w-4 text-primary" /> (Vote Bonus)
            </span>
            {isWeekendBonus && (
              <span className="font-bold text-primary">Weekend Bonus: 2x XP!</span>
            )}
            <span>
              + {xpGained} XP <Star className="inline h-4 w-4 text-yellow-400 fill-yellow-400" />
            </span>
            {streakBonus > 0 && (
              <span>
                + {streakBonus} Bonus XP <Flame className="inline h-4 w-4 text-orange-500 fill-orange-500" />
              </span>
            )}
          </>
        );
      }
    } else {
        if (useStreakFreeze) {
            newStats = {
                ...userStats,
                xp: userStats.xp + firstVoteBonus,
                lastStreakFreeze: new Date(),
            };
            toastDescription = (
                <>
                    <span className="font-bold text-blue-500">Streak Frozen!</span>
                    <span>
                        + {firstVoteBonus} XP <Vote className="inline h-4 w-4 text-primary" /> (Vote Bonus)
                    </span>
                    <span>Your streak is safe for today.</span>
                </>
            );
        } else {
            newStats = { 
              ...userStats, 
              xp: userStats.xp + firstVoteBonus,
              streak: 0 
            };
            toastDescription = (
                <>
                    <span className="font-bold text-destructive">Not this time!</span>
                    <span>
                        + {firstVoteBonus} XP <Vote className="inline h-4 w-4 text-primary" /> (Vote Bonus)
                    </span>
                    <span>Your streak has been reset.</span>
                </>
            );
        }
    }
    
    setUserStats(newStats);

    toast({
      title: "Vote Cast!",
      description: <div className="flex flex-col">{toastDescription}</div>,
    });
    setUseStreakFreeze(false); // Reset for next time
  };

  const isStreakFreezeAvailable = () => {
    if (!userStats.lastStreakFreeze) return true;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return userStats.lastStreakFreeze < sevenDaysAgo;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8 pb-20">
      {isClient && showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
        />
      )}
      <AlertDialog open={showStreakLossModal} onOpenChange={setShowStreakLossModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><Flame className="h-6 w-6 text-destructive" />Streak Lost!</AlertDialogTitle>
            <AlertDialogDescription>
              Oh no! You missed a day and your streak has been reset to zero. Don't worry, you can start a new one today!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowStreakLossModal(false)}>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-full max-w-6xl mx-auto space-y-8">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8" id="home">
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
                  <EmojiSelection 
                    onVote={handleVote} 
                    emojis={shuffledEmojis} 
                    isStreakFreezeAvailable={isStreakFreezeAvailable()}
                    useStreakFreeze={useStreakFreeze}
                    setUseStreakFreeze={setUseStreakFreeze}
                  />
                )}
              </CardContent>
            </Card>
            <div id="ai-tool">
              <AiVibeTool />
            </div>
          </div>
          <div className="space-y-8">
            <div id="stats">
              <GameStats stats={userStats} isStreakFreezeAvailable={isStreakFreezeAvailable()} />
            </div>
            <div id="leaderboard">
              <Leaderboard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <BottomNav />
    </div>
  );
}
