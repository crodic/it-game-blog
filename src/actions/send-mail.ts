'use server';

import { sendEmail } from '@/lib/email';

export async function sendWelcomeEmail(user: any) {
    return await sendEmail({
        template: 'welcome',
        to: user.email,
        subject: 'Welcome to our site',
        props: {
            name: user.name,
            siteName: 'My Site',
        },
    });
}

export async function sendBlogNotificationEmail({
    blogTitle,
    summary,
    href,
    createdAt,
    to,
}: {
    blogTitle: string;
    summary: string;
    href: string;
    createdAt: string;
    to: string;
}) {
    return await sendEmail({
        template: 'blogNotification',
        to,
        subject: `New Blog Post: ${blogTitle}`,
        props: {
            recipientName: 'Người Theo Dõi',
            blogTitle: blogTitle,
            createdAt: new Date(createdAt).toLocaleDateString(),
            summary,
            blogUrl: href,
            siteName: 'Animazing Blog',
        },
    });
}
