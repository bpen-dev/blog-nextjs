import { getCategoryListWithoutNotFound, getAllArticlesForLayout, getAllTagsForLayout } from '@/libs/microcms';
import { LIMIT } from '@/constants/index';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/context/SidebarContext';
import SidebarWrapper from '@/components/Sidebar/SidebarWrapper';
import './globals.css';
import styles from './layout.module.css';
import { PopularTag } from '@/libs/microcms';

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
  const categories = await getCategoryListWithoutNotFound({ limit: LIMIT });
  const tags = await getAllTagsForLayout();
  const all_articles = await getAllArticlesForLayout({ fields: ['tags'] });

  const tag_counts = all_articles.contents.reduce((acc: Record<string, number>, article) => {
    article.tags?.forEach(tag => {
      acc[tag.id] = (acc[tag.id] || 0) + 1;
    });
    return acc;
  }, {});
  
  const popularTags: PopularTag[] = tags.contents
    .map(tag => ({
      ...tag,
      count: tag_counts[tag.id] || 0,
    }))
    .filter(tag => tag.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <html lang="ja">
      <body>
        <SidebarProvider>
          <Header />
          <div className={styles.container}>
            <main className={styles.main}>{children}</main>

            <div className={styles.desktopSidebarWrapper}>
              <Sidebar categories={categories.contents} popularTags={popularTags} />
            </div>

            <div className={styles.mobileSidebarWrapper}>
              <SidebarWrapper categories={categories.contents} popularTags={popularTags} />
            </div>
          </div>
          <Footer />
          <BottomNav />
        </SidebarProvider>
      </body>
    </html>
  );
}