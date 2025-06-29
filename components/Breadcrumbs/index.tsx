import Link from 'next/link';
import { FiHome, FiFolder, FiChevronRight } from 'react-icons/fi';
import styles from './index.module.css';

// パンくずリストの各項目の型定義
type Crumb = {
  name: string;
  href: string;
  isCategory?: boolean; // カテゴリかどうかを判定するフラグ
};

// 修正点: 型名をPropsからBreadcrumbsPropsに変更
type BreadcrumbsProps = {
  crumbs: Crumb[];
};

/**
 * サーバーコンポーネント版パンくずリスト
 * propsで受け取ったデータを元に表示します。
 */
export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  // パンくずが1つ（ホームのみ）の場合は何も表示しない
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="パンくずリスト" className={styles.container}>
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => (
          <li key={index} className={styles.item}>
            {/* アイコンの表示 */}
            {index === 0 && <FiHome className={styles.icon} />}
            {crumb.isCategory && <FiFolder className={styles.icon} />}

            {/* 最後の項目以外はリンク、最後の項目はテキストとして表示 */}
            {index < crumbs.length - 1 ? (
              <Link href={crumb.href} className={styles.link}>
                {crumb.name}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {crumb.name}
              </span>
            )}

            {/* 区切り文字の表示 */}
            {index < crumbs.length - 1 && (
              <FiChevronRight className={styles.separator} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
