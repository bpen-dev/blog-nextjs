import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Simple Blog',
    default: 'Simple Blog',
  },
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: {
      template: '%s | Simple Blog',
      default: 'Simple Blog',
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
  const tags = await getTagList({ limit: LIMIT });

  return (
    <html lang="ja">
      <body>
        <Header />
        {/* <Nav tags={tags.contents} /> */}

        {/* ２カラム区域 */}
        <div className={styles.container}>
          {/* メインカラム */}
          <main className={styles.main}>{children}</main>

          {/* サイドバー ― ラッパーに .sidebar クラスを必ず付与 */}
          <aside className={styles.sidebar}>
            <Sidebar />
          </aside>
        </div>

        <Footer />
      </body>
    </html>
  );
}

