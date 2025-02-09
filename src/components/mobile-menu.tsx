'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenu({ items }: { items: { name: string; href: string }[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="sm:hidden flex">
            <Sheet key="right" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <Menu className="size-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="max-w-xs">
                    <div className="flex flex-col gap-4">
                        {items.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
