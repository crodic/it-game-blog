'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useId } from 'react';

export default function SwitchMode() {
    const { setTheme, theme } = useTheme();
    const id = useId();

    return (
        <div>
            <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
                <Switch
                    id={id}
                    checked={theme === 'light' ? true : false}
                    onCheckedChange={(value) => {
                        setTheme(value ? 'light' : 'dark');
                    }}
                    className="peer absolute inset-0 h-[inherit] w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
                />
                <span className="pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
                    <Moon size={16} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
                    <Sun size={16} strokeWidth={2} aria-hidden="true" />
                </span>
            </div>
            <Label htmlFor={id} className="sr-only">
                Labeled switch
            </Label>
        </div>
    );
}
