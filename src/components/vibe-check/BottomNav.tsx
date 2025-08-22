
'use client';

import { Home, Trophy, WandSparkles, BarChart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { href: '#home', icon: Home, label: 'Home' },
  { href: '#stats', icon: BarChart, label: 'Stats' },
  { href: '#leaderboard', icon: Trophy, label: 'VibeBoard' },
  { href: '#ai-tool', icon: WandSparkles, label: 'AI Tool' },
];

export function BottomNav() {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            {navItems.map((item) => (
                <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                         <a
                            href={item.href}
                            onClick={(e) => handleScroll(e, item.href)}
                            className="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group"
                        >
                            <item.icon className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
                            <span className="text-xs text-muted-foreground group-hover:text-primary sr-only">{item.label}</span>
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{item.label}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </div>
  );
}
