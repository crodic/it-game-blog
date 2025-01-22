import Link from 'next/link';
import SwitchMode from './switch-mode';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

const NAVIGATION_ITEMS = [
    {
        name: 'Trang chủ',
        href: '/',
    },
    {
        name: 'Bài viết',
        href: '/blogs',
    },
    {
        name: 'Về bản thân',
        href: '/about',
    },
    {
        name: 'Liên hệ',
        href: '/contact',
    },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 h-16 mb-10 bg-background">
            <div className="wrapper h-full p-2 flex justify-between items-center drop-shadow-md border-b">
                <h1 style={{ fontFamily: 'var(--font-dancing-script)' }} className="text-4xl text-primary">
                    <Link href="/">Animazing</Link>
                </h1>
                <nav className="hidden sm:block">
                    <ul className="flex items-center gap-4">
                        {NAVIGATION_ITEMS.map((item) => (
                            <li
                                key={item.href}
                                className={cn(
                                    'text-sm transition-colors duration-75 font-semibold uppercase',
                                    'hover:text-primary'
                                )}
                            >
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        ))}
                        <li>
                            <SwitchMode />
                        </li>
                    </ul>
                </nav>
                <Button size="icon" variant="ghost" className="sm:hidden flex">
                    <Menu className="size-6" />
                </Button>
            </div>
        </header>
    );
}
