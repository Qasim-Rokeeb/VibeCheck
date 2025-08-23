import { frames } from '../frames';
import { Button } from 'frames.js/next';

const handler = frames(async (ctx) => {
  const emoji = ctx.searchParams.emoji;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Here you would typically save the vote to a database
  // For now, we'll just show a "thanks for voting" message.

  return {
    image: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, hsl(210, 20%, 95%), hsl(210, 20%, 88%))',
          color: 'hsl(210, 10%, 20%)',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold' }}>Thanks for voting!</div>
        <div style={{ fontSize: 80, marginTop: '20px' }}>{emoji}</div>
        <div style={{ fontSize: 24, marginTop: '20px' }}>See the results on VibeCheck.</div>
      </div>
    ),
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button action="link" target={baseUrl!}>
        View Results
      </Button>,
    ],
  };
});

export const POST = handler;
