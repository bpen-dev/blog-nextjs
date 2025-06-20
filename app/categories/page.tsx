import { getCategoryList } from '@/libs/microcms';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'カテゴリ一覧',
};


export default async function Page() {
  const { contents: categories } = await getCategoryList();

  if (!categories || categories.length === 0) {
    return <h1>カテゴリがありません</h1>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>カテゴリ一覧</h1>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.listItem}>
            <Link href={`/categories/${category.id}`} className={styles.link}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}