import { ImageResponse } from 'next/server';
import { dailyEmojis } from '@/lib/mock-data';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date'); // To break cache

  // Load fonts
  const poppinsBold = fetch(
    new URL('../../../assets/Poppins-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const ptSans = fetch(
    new URL('../../../assets/PTSans-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  
  const [poppinsBoldData, ptSansData] = await Promise.all([poppinsBold, ptSans]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Poppins"',
          background: 'linear-gradient(120deg, hsl(210, 20%, 95%), hsl(210, 20%, 88%))',
          color: 'hsl(210, 10%, 20%)',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>
          VibeCheck
        </div>
        <div style={{ fontFamily: '"PT Sans"', fontSize: 32, marginTop: '1rem' }}>
          What's the vibe today?
        </div>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', fontSize: 100 }}>
          {dailyEmojis.map((emoji) => (
            <div key={emoji}>{emoji}</div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
      fonts: [
        {
          name: 'Poppins',
          data: poppinsBoldData,
          style: 'normal',
          weight: 700,
        },
        {
            name: 'PT Sans',
            data: ptSansData,
            style: 'normal',
            weight: 400,
        }
      ],
    }
  );
}
