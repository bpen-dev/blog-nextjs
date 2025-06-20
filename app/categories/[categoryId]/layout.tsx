import { getCategory } from '@/libs/microcms';
import styles from './layout.module.css';

// Propsの型定義を、以下のように関数の引数に直接書く形に変更します。
export default async function CategoriesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    categoryId: string;
  };
}) {
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
