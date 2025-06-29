import { getCategory } from '@/libs/microcms';
import Breadcrumbs from '@/components/Breadcrumbs'; // 作成したコンポーネントをインポート
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  params: {
    categoryId: string;
  };
};

export default async function CategoriesLayout({ children, params }: Props) {
  const category = await getCategory(params.categoryId);
  
  // パンくずリスト用のデータを構築
  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: category.name, href: `/categories/${category.id}`, isCategory: true },
  ];
  
  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <h1 className={styles.title}>
        「{category.name}」の記事一覧
      </h1>
      <div>{children}</div>
    </div>
  );
}
