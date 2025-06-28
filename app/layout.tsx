import { getCategoryList } from '@/libs/microcms';
import { LIMIT } from '@/constants/index';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';
import SidebarWrapper from '@/components/Sidebar/SidebarWrapper';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | 理系大学院生のぼちぼちITノート',
    default: '理系大学院生のぼちぼちITノート',
  },
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: {
      template: '%s | 理系大学院生のぼちぼちITノート',
      default: '理系大学院生のぼちぼちITノート',
    },
    description: 'A simple blog presented by microCMS',
    images: '/ogp.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const categories = await getCategoryList({ limit: LIMIT });

  return (
    <html lang="ja">
      <body>
        <SidebarProvider>
          <Header />
          <div className={styles.container}>
            <main className={styles.main}>{children}</main>

            {/* PC用のサイドバー (専用ラッパーで囲む) */}
            <div className={styles.desktopSidebarWrapper}>
              <Sidebar categories={categories.contents} />
            </div>

            {/* モバイル用のサイドバーラッパー (専用ラッパーで囲む) */}
            <div className={styles.mobileSidebarWrapper}>
              <SidebarWrapper categories={categories.contents} />
            </div>
          </div>
          <Footer />
          <BottomNav />
        </SidebarProvider>
      </body>
    </html>
  );
}