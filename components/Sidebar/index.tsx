'use client';

import React from 'react';
import Link from 'next/link';
import { Category, PopularTag } from '@/libs/microcms';
import { FiFolder, FiUser, FiSearch, FiX, FiTag } from 'react-icons/fi';
import { useSidebar } from '@/context/SidebarContext';
import styles from './index.module.css';

type Props = {
  categories?: Category[];
  popularTags?: PopularTag[];
};

const Sidebar: React.FC<Props> = ({ categories, popularTags }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={styles.sidebarInner}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>メニュー</h3>
        <button onClick={toggleSidebar} className={styles.closeButton}>
          <FiX />
        </button>
      </div>
      
      <div className={`${styles.section} ${styles.searchWidget}`}>
        <h3 className={styles.title}>
          <FiSearch />
          <span>検索</span>
        </h3>
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

      <div className={styles.section}>
        <h3 className={styles.title}>
          <FiTag />
          <span>人気のタグ</span>
        </h3>
        <ul className={styles.tagList}>
          {popularTags?.map((tag) => (
            <li key={tag.id}>
              {/* ↓↓↓ ここの () を削除しました ↓↓↓ */}
              <Link href={`/tags/${tag.id}`} className={styles.tagLink}>
                #{tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>
          <FiUser />
          <span>プロフィール</span>
        </h3>
        <div className={styles.profileCard}>
          <Link href="/writer" className={styles.profileLink}>
            <img
              src="/images/profile.webp"
              alt="プロフィール画像"
              className={styles.profileImage}
            />
            <p className={styles.profileName}>ぼちペン</p>
          </Link>
          <p className={styles.profileDesc}>
            2026年からSIerでSEになる予定の大学院生。キャリアに迷いつつ、AWSを中心にITを幅広く勉強中。
          </p>
          <div className={styles.qualifications}>
            <span className={styles.qualificationItem}>ITパスポート</span>
            <span className={styles.qualificationItem}>基本情報</span>
            <span className={styles.qualificationItem}>応用情報</span>
            <span className={styles.qualificationItem}>TOEIC 795</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;