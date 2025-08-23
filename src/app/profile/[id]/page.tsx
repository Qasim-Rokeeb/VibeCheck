
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerProfile } from '@/components/vibe-check/PlayerProfile';
import { leaderboardData } from '@/lib/mock-data';
import type { Player } from '@/lib/types';
import { notFound } from 'next/navigation';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const playerId = parseInt(params.id, 10);
  const player = leaderboardData.find((p) => p.id === playerId) as Player | undefined;

  if (!player) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
            <PlayerProfile player={player} />
        </div>
    </div>
  );
}
