'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WandSparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { analyzeFarcasterVibes } from '@/ai/flows/analyze-farcaster-vibes';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters long.'),
});

export function AiVibeTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setEmojis([]);
    try {
      const result = await analyzeFarcasterVibes(values);
      setEmojis(result.emojis);
    } catch (error) {
      console.error('AI Vibe Tool Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze vibes. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <WandSparkles className="text-primary" />
          AI Vibe Tool
        </CardTitle>
        <CardDescription>Analyze Farcaster to find emojis for any topic.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., What are people saying about memes?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Get Vibe Emojis'}
            </Button>
            
            {(isLoading || emojis.length > 0) && (
              <div className="w-full pt-4 border-t">
                <h4 className="font-semibold mb-2">Suggested Emojis:</h4>
                <div className="flex gap-4">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-16 rounded-lg" />
                    ))
                  ) : (
                    emojis.map((emoji, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center text-4xl bg-secondary w-16 h-16 rounded-lg shadow-inner transition-transform hover:scale-110"
                      >
                        {emoji}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
