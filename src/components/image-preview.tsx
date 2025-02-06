'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

export default function ImagePreview({ image, removeCallback }: { image: string; removeCallback: () => void }) {
    return (
        <div className="relative w-[200px] aspect-video">
            <Image src={image} alt="preview" fill className="object-cover h-full w-full object-top" />
            <Button
                onClick={removeCallback}
                type="button"
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1"
            >
                <Trash className="size-4" />
            </Button>
        </div>
    );
}
