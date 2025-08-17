
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThumbsUp, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { moreEmojis } from '@/lib/mock-data';

type EmojiSelectionProps = {
  emojis: string[];
  onVote: (emoji: string) => void;
};

export function EmojiSelection({ emojis, onVote }: EmojiSelectionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (emoji: string) => {
    setSelected(emoji);
  };

  const handleSubmit = () => {
    if (selected) {
      onVote(selected);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-center text-muted-foreground">Select one emoji that you think represents the community's vibe today.</p>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => handleSelect(emoji)}
            className={cn(
              'flex items-center justify-center text-5xl md:text-6xl bg-card hover:bg-secondary w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-md border-4 border-transparent transition-all duration-300 ease-in-out',
              'transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50',
              selected === emoji ? 'border-primary scale-110' : 'hover:border-accent/50'
            )}
            aria-label={`Vote for ${emoji}`}
          >
            {emoji}
          </button>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'flex items-center justify-center text-5xl md:text-6xl bg-secondary hover:bg-secondary/80 w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-md border-4 border-dashed border-border transition-all duration-300 ease-in-out',
                'transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50'
              )}
              aria-label="Select from more emojis"
            >
              <Plus className="h-12 w-12 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid grid-cols-5 gap-2">
              {moreEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(emoji)}
                  className={cn(
                    'flex items-center justify-center text-3xl bg-card hover:bg-secondary w-12 h-12 rounded-lg shadow-sm border-2 border-transparent transition-all duration-200 ease-in-out',
                    'transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50',
                     selected === emoji ? 'border-primary scale-110' : 'hover:border-accent/50'
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={!selected}
        className="font-headline text-lg"
      >
        <ThumbsUp className="mr-2 h-5 w-5" />
        Confirm Vote
      </Button>
    </div>
  );
}
