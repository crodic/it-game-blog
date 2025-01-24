import { Search } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchBar() {
    return (
        <div className="relative">
            <Input className="w-full" placeholder="Nhập từ khóa..." />
            <Search className="size-4 absolute top-1/2 right-3 -translate-y-1/2" />
        </div>
    );
}
