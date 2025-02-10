import { Metadata } from 'next';
import ContactForm from './_components/contact-form';

export const metadata: Metadata = {
    title: 'Liên hệ',
};

export default function Page() {
    return (
        <div className="wrapper">
            <section>
                <h1 className="text-3xl font-bold text-center text-secondary-foreground mb-6">📬 Liên Hệ</h1>
                <p className="text-muted-foreground text-center mb-6">
                    Cảm ơn bạn đã ghé thăm blog! Nếu bạn có bất kỳ câu hỏi, góp ý, hoặc muốn hợp tác, hãy liên hệ qua
                    các kênh sau:
                </p>

                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h2 className="text-lg font-semibold text-secondary-foreground">📧 Email</h2>
                        <p className="text-muted-foreground">
                            📩{' '}
                            <a href="mailto:alice01422@gmail.com" className="text-blue-600 hover:underline">
                                alice01422@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h2 className="text-lg font-semibold text-secondary-foreground">🌐 Mạng Xã Hội</h2>
                        <ul className="text-muted-foreground space-y-2">
                            <li>
                                🐙{' '}
                                <a href="https://github.com/crodic" className="text-blue-600 hover:underline">
                                    Github
                                </a>
                            </li>
                            <li>
                                📘{' '}
                                <a href="https://facebook.com/crodic0904" className="text-blue-600 hover:underline">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                🎮{' '}
                                <a href="https://discord.gg/crodic" className="text-blue-600 hover:underline">
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                        <h2 className="text-lg font-semibold text-secondary-foreground">💼 Hợp Tác & Quảng Cáo</h2>
                        <p className="text-muted-foreground">
                            Nếu bạn muốn hợp tác hoặc đặt quảng cáo trên blog, vui lòng gửi email hoặc liên hệ qua
                            Discord.
                        </p>
                    </div>

                    <div className="p-4 rounded-lg space-y-2">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
