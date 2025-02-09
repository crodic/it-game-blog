import { notFound } from 'next/navigation';
import xior from 'xior';

export default async function CheckServerStatus() {
    await xior.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`).catch((error) => {
        if (error.response?.status === 502 || error.response?.status === 503) {
            notFound();
        }
    });

    return null;
}
