import React from 'react';
import Link from 'next/link';
import { Category } from '@/libs/microcms'; // Categoryの型をインポート
import styles from './index.module.css';

// Propsの型を定義
type Props = {
  categories?: Category[];
};

const Sidebar: React.FC<Props> = ({ categories }) => (
  <div className={styles.sidebarInner}>
    {/* 検索ウィジェット */}
    <div className={styles.widget}>
      <h3 className={styles.title}>検索</h3>
      <form action="/search" className={styles.searchForm}>
        <input type="text" name="q" placeholder="サイト内を検索" />
        <button type="submit" aria-label="検索">🔍</button>
      </form>
    </div>

    {/* カテゴリ一覧ウィジェット */}
    <div className={styles.widget}>
      <h3 className={styles.title}>カテゴリ</h3>
      <ul className={styles.categoryList}>
        {/* categoriesデータを使ってリストを動的に生成 */}
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* プロフィールウィジェット */}
    <div className={styles.widget}>
      <h3 className={styles.title}>プロフィール</h3>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img
            src="/images/profile.jpg"
            alt="プロフィール画像"
            className={styles.profileImage}
          />
        </div>
        <Link href="/" className={styles.profileLink}>
          ぼちペン
        </Link>
        <p className={styles.profileDesc}>
          2026年からSIerでSEになる予定の大学院生。キャリアに迷いつつ、AWSを中心にITを幅広く勉強中。
        </p>
        <ul className={styles.qualifications}>
          <li>ITパスポート</li>
          <li>基本情報</li>
          <li>TOEIC795</li>
        </ul>
        <div className={styles.iconList}>
          {/* ...アイコン... */}
        </div>
      </div>
    </div>
  </div>
)

export default Sidebar;