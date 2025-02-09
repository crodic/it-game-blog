// emails/WelcomeEmail.tsx
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components';
import { FC } from 'react';

interface WelcomeEmailProps {
    name: string;
    siteName: string;
}

const WelcomeEmail: FC<WelcomeEmailProps> = ({ name, siteName }) => {
    return (
        <Html>
            <Head />
            <Preview>Chào mừng bạn đến với {siteName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Chào mừng bạn đến với {siteName}!</Heading>
                    <Text style={text}>Xin chào {name},</Text>
                    <Text style={text}>Cảm ơn bạn đã đăng ký nhận thông báo về website {siteName}.</Text>
                    <Text style={text}>
                        Người gửi,
                        <br />
                        The {siteName} Team
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
};

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0',
};

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
};

export default WelcomeEmail;
