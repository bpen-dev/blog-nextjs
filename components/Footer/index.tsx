import styles from './index.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ↓↓↓ ここから追加 ↓↓↓ */}
      <nav className={styles.nav}>
        <Link href="/disclaimer" className={styles.link}>
          免責事項
        </Link>
        <Link href="/privacy-policy" className={styles.link}>
          プライバシーポリシー
        </Link>
      </nav>
      {/* ↑↑↑ ここまで追加 ↑↑↑ */}
      <p className={styles.cr}>© SIMPLE. All Rights Reserved 2023</p>
    </footer>
  );
}