/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category } from '@prisma/client';

export const getCategories = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Category[];
};
