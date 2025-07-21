'use server';
/**
 * @fileOverview Analyzes Farcaster data to suggest emojis representing the community vibe.
 *
 * - analyzeFarcasterVibes - A function that analyzes Farcaster data and returns a list of emojis.
 * - AnalyzeFarcasterVibesInput - The input type for the analyzeFarcasterVibes function.
 * - AnalyzeFarcasterVibesOutput - The return type for the analyzeFarcasterVibes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFarcasterVibesInputSchema = z.object({
  query: z.string().describe('A query to use when searching Farcaster. Example: What are people saying about memes?'),
});
export type AnalyzeFarcasterVibesInput = z.infer<typeof AnalyzeFarcasterVibesInputSchema>;

const AnalyzeFarcasterVibesOutputSchema = z.object({
  emojis: z.array(z.string()).describe('A list of emojis that represent the current community vibe.'),
});
export type AnalyzeFarcasterVibesOutput = z.infer<typeof AnalyzeFarcasterVibesOutputSchema>;

export async function analyzeFarcasterVibes(input: AnalyzeFarcasterVibesInput): Promise<AnalyzeFarcasterVibesOutput> {
  return analyzeFarcasterVibesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFarcasterVibesPrompt',
  input: {schema: AnalyzeFarcasterVibesInputSchema},
  output: {schema: AnalyzeFarcasterVibesOutputSchema},
  prompt: `You are an AI assistant designed to analyze Farcaster data and determine the current community vibe based on a search query.

  Based on the following search query, provide a list of 5 emojis that best represent the current community vibe on Farcaster.
  Do not include any explanation or other text. Just provide the emojis, separated by commas.

  Search Query: {{{query}}}
  Emojis:`, // The AI assistant will analyze Farcaster data and return 5 emojis
});

const analyzeFarcasterVibesFlow = ai.defineFlow(
  {
    name: 'analyzeFarcasterVibesFlow',
    inputSchema: AnalyzeFarcasterVibesInputSchema,
    outputSchema: AnalyzeFarcasterVibesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    const emojis = output!.emojis;
    return {
      emojis: emojis,
    };
  }
);
