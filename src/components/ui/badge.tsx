import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
    background?: string;
}

function Badge({ className, variant, background, ...props }: BadgeProps) {
    const hexToRgb = (hex: string) => {
        // Remove # if present
        const cleanHex = hex.replace('#', '');
        const r = Number.parseInt(cleanHex.substring(0, 2), 16);
        const g = Number.parseInt(cleanHex.substring(2, 4), 16);
        const b = Number.parseInt(cleanHex.substring(4, 6), 16);
        return { r, g, b };
    };

    const rgb = hexToRgb(background || '');
    const backgroundRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
    return (
        <div
            className={cn(badgeVariants({ variant }), className)}
            style={{ backgroundColor: backgroundRgba, color: background }}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
