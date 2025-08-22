
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RankTitle } from '@/lib/types';
import { Crown, Flame, Target, Leaf } from 'lucide-react';

type RankInfo = {
    [key in RankTitle]: {
        icon: React.ElementType;
        className: string;
    }
}

const rankInfo: RankInfo = {
    'Vibe Oracle': {
        icon: Crown,
        className: 'bg-yellow-400/20 text-yellow-600 border-yellow-400/50 hover:bg-yellow-400/30'
    },
    'Streak Lord': {
        icon: Flame,
        className: 'bg-orange-500/20 text-orange-600 border-orange-500/50 hover:bg-orange-500/30'
    },
    'Vibe Sniper': {
        icon: Target,
        className: 'bg-blue-500/20 text-blue-600 border-blue-500/50 hover:bg-blue-500/30'
    },
    'Newbie': {
        icon: Leaf,
        className: 'bg-green-500/20 text-green-600 border-green-500/50 hover:bg-green-500/30'
    }
};


type RankBadgeProps = {
    title: RankTitle;
}

export function RankBadge({ title }: RankBadgeProps) {
    const { icon: Icon, className } = rankInfo[title];

    return (
        <Badge variant="outline" className={cn('gap-1.5 pl-2 mt-1 font-semibold', className)}>
            <Icon className="h-3.5 w-3.5" />
            <span>{title}</span>
        </Badge>
    );
}
