/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { incrementView } from '../actions';

export default function CheckViewed({ blogId }: { blogId: string }) {
    const promise = useRef<any>(null);
    const handleIncrementView = useCallback(async () => {
        await incrementView(blogId);
    }, [blogId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (promise.current) return;
            promise.current = handleIncrementView;
            promise.current();
        }, 30 * 1000);

        return () => clearTimeout(timer);
    }, [handleIncrementView]);

    return null;
}
