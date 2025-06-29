import styles from './index.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <Link href="/disclaimer" className={styles.link}>
          免責事項
        </Link>
        <Link href="/privacy-policy" className={styles.link}>
          プライバシーポリシー
        </Link>
        {/* ↓↓↓ ここから追加 ↓↓↓ */}
        <Link href="/contact" className={styles.link}>
          お問い合わせ
        </Link>
        {/* ↑↑↑ ここまで追加 ↑↑↑ */}
      </nav>
      <p className={styles.cr}>© 理系大学院生のぼちぼちITノート. All Rights Reserved 2025.</p>
    </footer>
  );
}