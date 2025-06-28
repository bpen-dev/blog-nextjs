import { getTagList, getCategoryList } from '@/libs/microcms'; // getCategoryList をインポート
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
// Navは使わなくなったのでインポートを削除
import './globals.css';
import styles from './layout.module.css';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | 理系大学院生のぼちぼちITノート', // サイトタイトルを変更
    default: '理系大学院生のぼちぼちITノート',    // サイトタイトルを変更
  },
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: {
      template: '%s | 理系大学院生のぼちぼちITノート', // サイトタイトルを変更
      default: '理系大学院生のぼちぼちITノート',    // サイトタイトルを変更
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
  // getTagList は現在使っていないので、削除またはコメントアウトしてもOK
  // const tags = await getTagList({ limit: LIMIT });
  const categories = await getCategoryList({ limit: LIMIT }); // カテゴリ一覧を取得

  return (
    <html lang="ja">
      <body>
        <Header />
        
        {/* Navを非表示にしたので削除 */}

        {/* ２カラム区域 */}
        <div className={styles.container}>
          {/* メインカラム */}
          <main className={styles.main}>{children}</main>

          {/* サイドバーに categories を渡す */}
          <aside className={styles.sidebar}>
            <Sidebar categories={categories.contents} />
          </aside>
        </div>

        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}