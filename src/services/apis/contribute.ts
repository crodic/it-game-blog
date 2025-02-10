import { Contributes } from '@prisma/client';

export const getContributes = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contribute`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Contributes[];
};

export const getContribute = async (id: string | undefined) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contribute/${id}`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Contributes;
};

export const seenContribute = async (id: string | undefined) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contribute/${id}`, {
        method: 'PUT',
        credentials: 'include',
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Contributes;
};
