import { getCategory } from '@/libs/microcms';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  params: {
    categoryId: string;
  };
};

export default async function CategoriesLayout({ children, params }: Props) {
  // `params` を直接使用してカテゴリを取得します
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