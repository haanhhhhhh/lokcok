import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

import DrawerButton from '@/components/DrawerButton';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Providers from '@/components/Providers';
import Sidebar from '@/components/Sidebar';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta'
});

export const metadata: Metadata = {
  title: 'LokCok - Sàn Thương Mại KOLs/KOCs Pass Items',
  description: 'LokCok - Nền tảng mua bán đồ đã qua sử dụng của KOLs và KOCs hàng đầu Việt Nam',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='vi' className={jakarta.variable}>
      <body className={jakarta.className}>
        <Providers>
          <div className='drawer'>
            <DrawerButton />
            <div className='drawer-content'>
              <div className='flex min-h-screen flex-col bg-base-100/30 backdrop-blur-xl'>
                <Header />
                <main className='container mx-auto flex-1 px-4'>
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <div className='drawer-side'>
              <label
                htmlFor='my-drawer'
                aria-label='close sidebar'
                className='drawer-overlay'
              ></label>
              <Sidebar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
