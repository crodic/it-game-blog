import CheckServerStatus from '@/components/check-server-status';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <CheckServerStatus />
            {children}
            <Footer />
        </>
    );
}
