// services/emails/blog-notification-email.tsx
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components';
import { FC } from 'react';

interface BlogNotificationEmailProps {
    recipientName: string;
    blogTitle: string;
    createdAt: string;
    summary: string;
    blogUrl: string;
    siteName: string;
}

const BlogNotificationEmail: FC<BlogNotificationEmailProps> = ({
    recipientName,
    blogTitle,
    createdAt,
    summary,
    blogUrl,
    siteName,
}) => {
    return (
        <Html>
            <Head />
            <Preview>New blog post: {blogTitle}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Blog Post Published!</Heading>

                    <Text style={greeting}>Hi {recipientName},</Text>

                    <Text style={text}>
                        We&apos;ve just published a new article that we think you&apos;ll find interesting.
                    </Text>

                    <Section style={blogSection}>
                        <Heading style={h2}>{blogTitle}</Heading>
                        <Text style={dateText}>Published on: {createdAt}</Text>
                        <Text style={summaryText}>{summary}</Text>
                    </Section>

                    <Section style={buttonContainer}>
                        <Button style={{ ...button, padding: '12px 20px' }} href={blogUrl}>
                            Read Full Article
                        </Button>
                    </Section>

                    <Hr style={divider} />

                    <Text style={footer}>
                        You&apos;re receiving this email because you&apos;ve subscribed to blog updates from {siteName}.
                        <br />
                        <Link href="#unsubscribe" style={unsubscribeLink}>
                            Unsubscribe
                        </Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
};

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
    textAlign: 'center' as const,
};

const h2 = {
    color: '#444',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '20px 0 10px',
};

const greeting = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '20px',
};

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '20px',
};

const blogSection = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '5px',
    margin: '20px 0',
};

const dateText = {
    color: '#666',
    fontSize: '14px',
    marginBottom: '12px',
};

const summaryText = {
    color: '#444',
    fontSize: '15px',
    lineHeight: '22px',
    marginBottom: '15px',
};

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '30px 0',
};

const button = {
    backgroundColor: '#007bff',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
};

const divider = {
    borderTop: '1px solid #ddd',
    margin: '30px 0',
};

const footer = {
    color: '#666',
    fontSize: '13px',
    lineHeight: '20px',
    textAlign: 'center' as const,
};

const unsubscribeLink = {
    color: '#999',
    textDecoration: 'underline',
};

export default BlogNotificationEmail;
