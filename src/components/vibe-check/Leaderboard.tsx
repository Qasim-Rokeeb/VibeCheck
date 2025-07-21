import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { leaderboardData } from '@/lib/mock-data';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

const rankColors = [
  'text-yellow-500', // 1st
  'text-gray-400',  // 2nd
  'text-amber-700' // 3rd
];

export function Leaderboard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Trophy className="text-primary" />
          VibeBoard
        </CardTitle>
        <CardDescription>Top players by correct guesses and streaks.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">XP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-bold text-center">
                  <span className={cn(player.rank <= 3 && rankColors[player.rank - 1])}>
                    {player.rank}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                       <AvatarImage src={player.avatar} alt={player.name} data-ai-hint="avatar" />
                       <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{player.name}</span>
                        <Badge variant="secondary" className="w-fit">{player.title}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{player.xp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
