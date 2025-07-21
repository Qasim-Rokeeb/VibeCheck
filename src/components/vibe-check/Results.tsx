'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, MessageSquareQuote, XCircle } from 'lucide-react';

type ResultsProps = {
  selectedEmoji: string | null;
  winningEmoji: string | null;
};

export function Results({ selectedEmoji, winningEmoji }: ResultsProps) {
  if (!selectedEmoji || !winningEmoji) {
    return (
        <div className="text-center p-8">
            <p className="text-muted-foreground">The results are being tallied. Check back soon!</p>
        </div>
    );
  }

  const didWin = selectedEmoji === winningEmoji;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h3 className="text-2xl font-bold font-headline">The results are in!</h3>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-muted-foreground">Your Vote</p>
          <div className="text-6xl md:text-7xl p-4 bg-secondary rounded-2xl shadow-inner">
            {selectedEmoji}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold text-muted-foreground">Winning Vibe</p>
          <div className="relative text-6xl md:text-7xl p-4 bg-primary/10 border-2 border-primary rounded-2xl shadow-inner">
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-2">
                <TrophyIcon className="w-5 h-5" />
            </div>
            {winningEmoji}
          </div>
        </div>
      </div>

      <Card
        className={`p-4 w-full max-w-sm ${
          didWin ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
        }`}
      >
        <div className="flex items-center gap-3">
          {didWin ? (
            <CheckCircle className="h-8 w-8 text-green-600" />
          ) : (
            <XCircle className="h-8 w-8 text-red-600" />
          )}
          <div>
            <h4 className="font-bold">
              {didWin ? 'You got it!' : 'Not quite!'}
            </h4>
            <p className="text-sm">
              {didWin ? "You're in tune with the community vibe." : 'Better luck tomorrow!'}
            </p>
          </div>
        </div>
      </Card>
      
      <Button size="lg" className="font-headline text-lg mt-4" onClick={() => alert('Farcaster cast sharing not implemented yet.')}>
        <MessageSquareQuote className="mr-2 h-5 w-5" />
        Cast Your Vibe
      </Button>
    </div>
  );
}


function TrophyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    )
  }
