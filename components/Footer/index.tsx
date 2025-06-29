import styles from './index.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {/* ↓↓↓ 「運営者情報」のリンクを追加 ↓↓↓ */}
        <Link href="/writer" className={styles.link}>
          運営者情報
        </Link>
        <Link href="/contact" className={styles.link}>
          お問い合わせ
        </Link>
        <Link href="/disclaimer" className={styles.link}>
          免責事項
        </Link>
        <Link href="/privacy-policy" className={styles.link}>
          プライバシーポリシー
        </Link>
      </nav>
      <p className={styles.cr}>© 理系大学院生のぼちぼちITノート All Rights Reserved.</p>
    </footer>
  );
}