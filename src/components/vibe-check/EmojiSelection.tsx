
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThumbsUp, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { moreEmojis } from '@/lib/mock-data';

type EmojiSelectionProps = {
  emojis: string[];
  onVote: (emoji: string) => void;
};

const emojiDescriptions: { [key: string]: string } = {
  '💀': 'I\'m dead',
  '😂': 'Laughing so hard I\'m crying',
  '🤯': 'Mind blown',
  '🤡': 'Clownin\' around',
  '😎': 'Feeling cool',
  '😀': 'Grinning Face',
  '😁': 'Beaming Face with Smiling Eyes',
  '😅': 'Grinning Squinting Face',
  '🤣': 'Rolling on the Floor Laughing',
  '😊': 'Smiling Face with Smiling Eyes',
  '😇': 'Smiling Face with Halo',
  '😍': 'Smiling Face with Heart-Eyes',
  '🤔': 'Thinking Face',
  '🤨': 'Face with Raised Eyebrow',
  '😐': 'Neutral Face',
  '😑': 'Expressionless Face',
  '😶': 'Face Without Mouth',
  '🙄': 'Face with Rolling Eyes',
  '😏': 'Smirking Face',
  '😮': 'Face with Open Mouth',
  '🤐': 'Zipper-Mouth Face',
  '😯': 'Hushed Face',
  '😥': 'Sad but Relieved Face',
  '😭': 'Loudly Crying Face',
  '😱': 'Face Screaming in Fear',
  '😫': 'Tired Face',
  '😠': 'Angry Face',
  '😡': 'Pouting Face',
  '😤': 'Face with Steam From Nose',
  '🤢': 'Nauseated Face',
  '🤮': 'Face Vomiting',
  '🤧': 'Sneezing Face',
  '🥵': 'Hot Face',
  '🥶': 'Cold Face',
  '🥴': 'Woozy Face',
  '😵': 'Dizzy Face',
  '🥳': 'Partying Face',
  '🤠': 'Cowboy Hat Face',
  '🤑': 'Money-Mouth Face',
  '🤫': 'Shushing Face',
  '🤭': 'Face with Hand Over Mouth',
  '🧐': 'Face with Monocle',
  '🤓': 'Nerd Face',
  '😈': 'Smiling Face with Horns',
  '👿': 'Angry Face with Horns',
  '👹': 'Ogre',
  '👺': 'Goblin',
  '👽': 'Alien',
  '👻': 'Ghost',
  '👾': 'Alien Monster',
  '🤖': 'Robot',
  '🎃': 'Jack-O-Lantern',
  '😺': 'Grinning Cat',
  '😸': 'Grinning Cat with Smiling Eyes',
  '😹': 'Cat with Tears of Joy',
  '😻': 'Smiling Cat with Heart-Eyes',
  '😼': 'Cat with Wry Smile',
  '😽': 'Kissing Cat',
  '🙀': 'Weary Cat',
  '😿': 'Crying Cat',
  '😾': 'Pouting Cat',
  '👋': 'Waving Hand',
  '🤚': 'Raised Back of Hand',
  '🖐': 'Hand with Fingers Splayed',
  '✋': 'Raised Hand',
  '🖖': 'Vulcan Salute',
  '👌': 'OK Hand',
  '🤏': 'Pinching Hand',
  '✌️': 'Victory Hand',
  '🤞': 'Crossed Fingers',
  '🤟': 'Love-You Gesture',
  '🤘': 'Sign of the Horns',
  '🤙': 'Call Me Hand',
  '👈': 'Backhand Index Pointing Left',
  '👉': 'Backhand Index Pointing Right',
  '👆': 'Backhand Index Pointing Up',
  '🖕': 'Middle Finger',
  '👇': 'Backhand Index Pointing Down',
  '☝️': 'Index Pointing Up',
  '👍': 'Thumbs Up',
  '👎': 'Thumbs Down',
  '✊': 'Raised Fist',
  '👊': 'Oncoming Fist',
  '🤛': 'Left-Facing Fist',
  '🤜': 'Right-Facing Fist',
  '🤝': 'Handshake',
  '🙏': 'Folded Hands',
  '🤲': 'Palms Up Together',
  '🙌': 'Raising Hands',
  '👐': 'Open Hands',
  '💅': 'Nail Polish',
  '✍️': 'Writing Hand',
  '💪': 'Flexed Biceps',
  '🦵': 'Leg',
  '🦶': 'Foot',
  '👂': 'Ear',
  '👃': 'Nose',
  '🧠': 'Brain',
  '🦷': 'Tooth',
  '🦴': 'Bone',
  '👀': 'Eyes',
  '👁': 'Eye',
  '👅': 'Tongue',
  '👄': 'Mouth',
  '💋': 'Kiss Mark',
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
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button
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
            </TooltipTrigger>
            <TooltipContent>
              <p>{emojiDescriptions[emoji] || 'Select this emoji'}</p>
            </TooltipContent>
          </Tooltip>
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
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleSelect(emoji)}
                      className={cn(
                        'flex items-center justify-center text-3xl bg-card hover:bg-secondary w-12 h-12 rounded-lg shadow-sm border-2 border-transparent transition-all duration-200 ease-in-out',
                        'transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50',
                         selected === emoji ? 'border-primary scale-110' : 'hover:border-accent/50'
                      )}
                    >
                      {emoji}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{emojiDescriptions[emoji] || 'Select'}</p>
                  </TooltipContent>
                </Tooltip>
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
