// lib/email.server.ts
import 'server-only';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import WelcomeEmail from '@/services/emails/welcome-email';
import BlogNotificationEmail from '@/services/emails/blog-notification-email';

interface WelcomeEmailProps {
    name: string;
    siteName: string;
}

interface BlogNotificationEmailProps {
    recipientName: string;
    blogTitle: string;
    createdAt: string;
    summary: string;
    blogUrl: string;
    siteName: string;
}

type TemplateName = 'welcome' | 'blogNotification';

interface TemplateProps {
    welcome: WelcomeEmailProps;
    blogNotification: BlogNotificationEmailProps;
}

type TemplateComponent<T> = (props: T) => JSX.Element;

const templates: {
    [K in TemplateName]: TemplateComponent<TemplateProps[K]>;
} = {
    welcome: WelcomeEmail as TemplateComponent<WelcomeEmailProps>,
    blogNotification: BlogNotificationEmail as TemplateComponent<BlogNotificationEmailProps>,
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Type-safe function để gửi email
export async function sendEmail<T extends TemplateName>({
    template,
    to,
    subject,
    props,
}: {
    template: T;
    to: string;
    subject: string;
    props: TemplateProps[T];
}) {
    try {
        const Template = templates[template];
        if (!Template) {
            throw new Error(`Template ${template} not found`);
        }

        const html = await render(Template(props));

        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html,
        });

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}
