
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, CalendarClock, CheckCircle, Trophy, XCircle } from 'lucide-react';
import type { VoteHistory } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function RecapPage() {
  const [voteHistory, setVoteHistory] = useState<VoteHistory[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedHistory = localStorage.getItem('vibeCheckVoteHistory');
    if (storedHistory) {
      setVoteHistory(JSON.parse(storedHistory));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <Link href="/" legacyBehavior>
          <Button variant="outline" className="gap-2">
            <ArrowLeft />
            Back to Game
          </Button>
        </Link>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl flex items-center gap-3">
              <CalendarClock className="text-primary" />
              Your Weekly Recap
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isClient && voteHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-semibold">No votes recorded yet!</p>
                <p className="text-muted-foreground mt-2">Play the game to see your recap here.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {voteHistory.map((vote, index) => (
                  <div key={vote.date}>
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{formatDate(vote.date)}</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        {/* Your Guess */}
                        <div className="flex flex-col items-center text-center gap-2">
                            <p className="font-semibold text-muted-foreground">Your Guess</p>
                            <div className="text-5xl">{vote.guess}</div>
                        </div>

                        {/* Result Icon */}
                        <div className="flex justify-center items-center">
                            {vote.guess === vote.winner ? (
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            ) : (
                                <XCircle className="w-12 h-12 text-destructive" />
                            )}
                        </div>

                        {/* Winning Vibe */}
                        <div className="flex flex-col items-center text-center gap-2">
                             <p className="font-semibold text-muted-foreground flex items-center gap-1.5"><Trophy className="w-4 h-4 text-yellow-500" /> Winning Vibe</p>
                            <div className="text-5xl">{vote.winner}</div>
                        </div>
                      </CardContent>
                    </Card>
                    {index < voteHistory.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    