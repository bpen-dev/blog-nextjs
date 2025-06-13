import Link from 'next/link'
import styles from './index.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoText}>
        <h1 className={styles.logoTitle}>理系大学院生のぼちぼちITノート</h1>
      </Link>
    </header>
  )
}
