import React from 'react';
import Link from 'next/link';
import { Category } from '@/libs/microcms';
// react-iconsからアイコンをインポート
import { FiFolder, FiUser, FiSearch } from 'react-icons/fi'; // FiSearchを追加
import styles from './index.module.css';

type Props = {
  categories?: Category[];
};

const Sidebar: React.FC<Props> = ({ categories }) => (
  <div className={styles.sidebarInner}>
    {/* ↓↓↓ 検索ウィジェットをここに追加 ↓↓↓ */}
    <div className={`${styles.section} ${styles.searchWidget}`}>
      <h3 className={styles.title}>
        <FiSearch />
        <span>検索</span>
      </h3>
      {/* 検索フォームは単純なformタグで実装 */}
      <form action="/search" className={styles.searchForm}>
        <input
          type="search"
          name="q"
          placeholder="キーワードで検索..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <FiSearch />
        </button>
      </form>
    </div>

    {/* カテゴリ一覧ウィジェット */}
    <div className={styles.section}>
      <h3 className={styles.title}>
        <FiFolder />
        <span>カテゴリ</span>
      </h3>
      <ul className={styles.categoryList}>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`} className={styles.categoryLink}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* プロフィールウィジェット */}
    <div className={styles.section}>
      <h3 className={styles.title}>
        <FiUser />
        <span>プロフィール</span>
      </h3>
      <div className={styles.profileCard}>
        <img
          src="/images/profile.jpg"
          alt="プロフィール画像"
          className={styles.profileImage}
        />
        <p className={styles.profileName}>ぼちペン</p>
        <p className={styles.profileDesc}>
          2026年からSIerでSEになる予定の大学院生。キャリアに迷いつつ、AWSを中心にITを幅広く勉強中。
        </p>
        <div className={styles.qualifications}>
          <span className={styles.qualificationItem}>ITパスポート</span>
          <span className={styles.qualificationItem}>基本情報</span>
          <span className={styles.qualificationItem}>TOEIC 795</span>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;