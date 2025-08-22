import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple seeded PRNG (mulberry32)
function mulberry32(a: number) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Function to create a seed from a string (e.g., date)
function createSeed(str: string) {
  let h = 1779033703, i = 0, len = str.length;
  for (; i < len; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return h;
}

// Fisher-Yates shuffle with a seeded PRNG
export function seededShuffle<T>(array: T[], seedStr: string): T[] {
  const seed = createSeed(seedStr);
  const random = mulberry32(seed);
  const result = [...array];
  let currentIndex = result.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex], result[currentIndex]];
  }

  return result;
}
