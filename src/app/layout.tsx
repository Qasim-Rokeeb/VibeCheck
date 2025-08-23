
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/vibe-check/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { headers } from "next/headers";
import { getFrameFlattened } from "frames.js/next/server";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const frameMetadata = getFrameFlattened({
      version: 'vNext',
      buttons: [
          {
              label: 'Check the vibe',
              action: 'post',
          },
      ],
      image: `${baseUrl}/api/og`,
      postUrl: `${baseUrl}/api/frame`,
  });

  return {
      title: 'VibeCheck',
      description: 'Can you guess the community’s vibe today? One emoji. One vote. One shot.',
      other: {
          ...frameMetadata,
      },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentMonth = new Date().getMonth();
  // October is month 9 (0-indexed)
  const isSpookySeason = currentMonth === 9;

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            forcedTheme={isSpookySeason ? "theme-spooky" : undefined}
          >
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
