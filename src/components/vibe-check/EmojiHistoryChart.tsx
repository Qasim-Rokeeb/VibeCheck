
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { dailyEmojis, emojiHistoryData } from '@/lib/mock-data';
import { BarChart, TrendingUp } from 'lucide-react';
import { Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartConfig = {
  '💀': { label: '💀', color: 'hsl(var(--chart-1))' },
  '😂': { label: '😂', color: 'hsl(var(--chart-2))' },
  '🤯': { label: '🤯', color: 'hsl(var(--chart-3))' },
  '🤡': { label: '🤡', color: 'hsl(var(--chart-4))' },
  '😎': { label: '😎', color: 'hsl(var(--chart-5))' },
};

export function EmojiHistoryChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <TrendingUp className="text-primary" />
          Weekly Vibe History
        </CardTitle>
        <CardDescription>Vote distribution for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emojiHistoryData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                    />
                    {dailyEmojis.map((emoji) => (
                        <Bar
                            key={emoji}
                            dataKey={emoji}
                            stackId="a"
                            fill={chartConfig[emoji as keyof typeof chartConfig].color}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
