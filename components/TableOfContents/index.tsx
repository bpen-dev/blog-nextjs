import { TocItem } from '@/libs/utils';
import styles from './index.module.css';

type Props = {
  toc: TocItem[];
};

/**
 * 目次を表示するコンポーネント
 */
export default function TableOfContents({ toc }: Props) {
  // 目次が空の場合は何も表示しない
  if (toc.length === 0) {
    return null;
  }

  return (
    <nav className={styles.container}>
      <p className={styles.title}>
        目次
      </p>
      <ul className={styles.list}>
        {toc.map((item) => (
          <li key={item.id} className={styles[item.level]}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}