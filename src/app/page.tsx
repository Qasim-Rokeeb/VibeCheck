
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
import { Award, Flame, MessageSquareQuote, Star, ThumbsUp, Vote } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { EmojiHistoryChart } from '@/components/vibe-check/EmojiHistoryChart';
import type { VoteHistory } from '@/lib/types';


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
  const [showRevealModal, setShowRevealModal] = useState(false);
  const [xpGainedToday, setXpGainedToday] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const todayString = today.toDateString();
    
    // Check for last vote to determine if voted today
    const lastVoteDateStr = localStorage.getItem('vibeCheckLastVoteDate');
    if (lastVoteDateStr === todayString) {
      setHasVotedToday(true);
      const voteHistoryStr = localStorage.getItem('vibeCheckVoteHistory');
      if (voteHistoryStr) {
        const voteHistory: VoteHistory[] = JSON.parse(voteHistoryStr);
        const todayVote = voteHistory.find(v => v.date === todayString);
        if (todayVote) {
          setSelectedEmoji(todayVote.guess);
        }
      }
      setWinningEmoji(mockWinningEmoji); // Reveal winner if already voted
    }


    const storedUserStatsStr = localStorage.getItem('vibeCheckUserStats');
    const storedXpGainedStr = localStorage.getItem('vibeCheckXpGained');

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
        const diffDays = Math.floor((today.getTime() - lastVoteDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1 && currentStats.streak > 0) {
          setShowStreakLossModal(true);
          setUserStats(prev => ({...prev, streak: 0}));
        }
      }

      if (lastVoteDateStr === todayString) {
        setXpGainedToday(storedXpGainedStr ? parseInt(storedXpGainedStr, 10) : 0);
      } else {
         localStorage.removeItem('vibeCheckXpGained');
      }

      setUserStats(currentStats);
    }

    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
      if (hasVotedToday) {
        localStorage.setItem('vibeCheckXpGained', xpGainedToday.toString());
      }
    }
  }, [userStats, isClient, hasVotedToday, xpGainedToday]);

  const handleShare = () => {
    const text = `I just played VibeCheck! My vibe was ${selectedEmoji}, the winning vibe was ${winningEmoji}. My current streak is ${userStats.streak} days! 🔥`;
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank');
  };

  const handleVote = (emoji: string) => {
    if (hasVotedToday) return;

    const voteDate = new Date();
    const todayString = voteDate.toDateString();

    // Store vote history
    const voteHistoryStr = localStorage.getItem('vibeCheckVoteHistory');
    let voteHistory: VoteHistory[] = voteHistoryStr ? JSON.parse(voteHistoryStr) : [];
    
    const newVote: VoteHistory = {
      date: todayString,
      guess: emoji,
      winner: mockWinningEmoji,
    };
    
    // Add new vote and keep only the last 7 days
    voteHistory.unshift(newVote);
    voteHistory = voteHistory.slice(0, 7);
    localStorage.setItem('vibeCheckVoteHistory', JSON.stringify(voteHistory));

    localStorage.setItem('vibeCheckLastVoteDate', todayString);
    setSelectedEmoji(emoji);
    setHasVotedToday(true);
    setWinningEmoji(mockWinningEmoji);
    setShowRevealModal(true);

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
    
    const totalXpGained = newStats.xp - userStats.xp;
    setXpGainedToday(totalXpGained);
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
            <AlertDialogTitle>Streak Lost!</AlertDialogTitle>
            <AlertDialogDescription>
              You missed a day of voting, so your streak has been reset. Don't worry, you can start a new one today!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowStreakLossModal(false)}>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRevealModal} onOpenChange={setShowRevealModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-headline text-2xl">Today's Vibe Is...</AlertDialogTitle>
            <AlertDialogDescription className="text-center">The results are in! Here's how you did.</AlertDialogDescription>
          </AlertDialogHeader>
          <Results selectedEmoji={selectedEmoji} winningEmoji={winningEmoji} streak={userStats.streak} />
          <AlertDialogFooter className="sm:justify-center gap-2 sm:gap-4">
             <Button variant="outline" onClick={() => setShowRevealModal(false)}>
                Close
              </Button>
              <Button onClick={handleShare}>
                  <MessageSquareQuote className="mr-2 h-5 w-5" />
                  Share on Warpcast
              </Button>
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
                  <div className="text-center py-8">
                    <p className="text-2xl font-bold font-headline mb-2">You've already voted today!</p>
                    <p className="text-muted-foreground">Come back tomorrow for the next VibeCheck.</p>
                    <Button variant="secondary" className="mt-4" onClick={() => setShowRevealModal(true)}>
                      Show My Results
                    </Button>
                  </div>
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
            <EmojiHistoryChart />
            <div id="ai-tool">
              <AiVibeTool />
            </div>
          </div>
          <div className="space-y-8">
            <div id="stats">
              <GameStats stats={userStats} isStreakFreezeAvailable={isStreakFreezeAvailable()} xpGainedToday={xpGainedToday} />
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
