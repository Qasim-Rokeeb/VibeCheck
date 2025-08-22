
import { Button } from 'frames.js/next';
import { frames } from './frames';
import { dailyEmojis } from '@/lib/mock-data';

const frameHandler = frames(async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // A frame can have a maximum of 4 buttons. We'll take the first 3 emojis and add a "Cast Your Vibe" button.
  const emojiButtons = dailyEmojis.slice(0, 3).map((emoji) => (
    <Button
      key={emoji}
      action="post"
      target={{ pathname: '/vote', query: { emoji } }}
    >
      {emoji}
    </Button>
  ));

  return {
    image: `${baseUrl}/api/og?date=${Date.now()}`,
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      ...emojiButtons,
      <Button action="link" target={baseUrl!}>
        Cast Your Vibe
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
