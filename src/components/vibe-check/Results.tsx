
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, MessageSquareQuote, Trophy, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ResultsProps = {
  selectedEmoji: string | null;
  winningEmoji: string | null;
  streak: number;
};

export function Results({ selectedEmoji, winningEmoji, streak }: ResultsProps) {
  if (!selectedEmoji || !winningEmoji) {
    return (
        <div className="text-center p-8">
            <p className="text-muted-foreground">The results are being tallied. Check back soon!</p>
        </div>
    );
  }

  const didWin = selectedEmoji === winningEmoji;

  const handleShare = () => {
    const text = `I just played VibeCheck! My vibe was ${selectedEmoji}, the winning vibe was ${winningEmoji}. My current streak is ${streak} days! 🔥`;
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }
    },
  };

  return (
    <motion.div 
      className="flex flex-col items-center gap-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants} className="text-2xl font-bold font-headline">The results are in!</motion.h3>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
          <p className="font-semibold text-muted-foreground">Your Vote</p>
          <div className={cn(
              "text-6xl md:text-7xl p-4 rounded-2xl shadow-inner",
              didWin ? "bg-primary/10 border-2 border-primary" : "bg-secondary"
            )}>
            {selectedEmoji}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
          <p className="font-semibold text-muted-foreground">Winning Vibe</p>
          <div className="relative text-6xl md:text-7xl p-4 bg-primary/10 border-2 border-primary rounded-2xl shadow-inner">
            <motion.div 
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-2"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
            >
                <Trophy className="w-5 h-5" />
            </motion.div>
            {winningEmoji}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="w-full max-w-sm">
        <Card
          className={`p-4 ${
            didWin ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800'
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
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button size="lg" className="font-headline text-lg mt-4" onClick={handleShare}>
          <MessageSquareQuote className="mr-2 h-5 w-5" />
          Cast Your Vibe
        </Button>
      </motion.div>
    </motion.div>
  );
}
