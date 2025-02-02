'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { KeyboardEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const [value, setValue] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && value) {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('page');
            newSearchParams.delete('limit');
            newSearchParams.set('q', value);
            router.push(`?${newSearchParams.toString()}`);
        } else if (e.key === 'Enter') {
            router.push('?');
        }
    };

    return (
        <div className="relative">
            <Input
                className="w-full"
                placeholder="Nhập từ khóa..."
                value={value}
                onChange={handleChange}
                onKeyDown={handleSearch}
            />
            <Search className="size-4 absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
    );
}
