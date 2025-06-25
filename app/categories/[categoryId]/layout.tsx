import { getCategory } from '@/libs/microcms';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  // params を Promise として型定義します
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoriesLayout({ children, params: paramsPromise }: Props) {
  // Promise を await して、実際の params を取り出します
  const params = await paramsPromise;
  const category = await getCategory(params.categoryId);

  return (
    <div>
      <h1 className={styles.title}>
        「{category.name}」の記事一覧
      </h1>
      <div>{children}</div>
    </div>
  );
}