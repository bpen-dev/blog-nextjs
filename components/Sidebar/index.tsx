import React from 'react';
import Link from 'next/link';
import styles from './index.module.css';


const Sidebar: React.FC = () => (
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
        <li>
          <Link href="/category/aws">
            AWS <span className={styles.count}>5</span>
          </Link>
        </li>
        <li>
          <Link href="/category/career">
            キャリア・就活 <span className={styles.count}>1</span>
          </Link>
        </li>
        {/* 他カテゴリも同様に */}
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
          {/* <button aria-label="ホーム">
            <FaHome />
          </button>
          <button aria-label="閉じる">
            <FaTimes />
          </button> */}
        </div>
      </div>
    </div>
  </div>
)

export default Sidebar
