import { FiClock, FiRefreshCw } from 'react-icons/fi';
import { formatDate } from '@/libs/utils';
import styles from './index.module.css';

type Props = {
  publishedAt: string;
  updatedAt: string;
};

/**
 * 2つの日付を比較し、意味のある差があるか（例: 1分以上）を判定するヘルパー関数
 * @param date1Str
 * @param date2Str
 */
const areDatesDifferent = (date1Str: string, date2Str: string) => {
  if (!date1Str || !date2Str) return false;
  const d1 = new Date(date1Str).getTime();
  const d2 = new Date(date2Str).getTime();
  // 差が60秒より大きいかチェック
  return Math.abs(d1 - d2) > 60 * 1000;
};

export default function ArticleDate({ publishedAt, updatedAt }: Props) {
  const showUpdateDate = areDatesDifferent(publishedAt, updatedAt);

  return (
    <div className={styles.container}>
      <span className={styles.dateItem}>
        <FiClock />
        {formatDate(publishedAt)}
      </span>
      {showUpdateDate && (
        <span className={styles.dateItem}>
          <FiRefreshCw />
          {formatDate(updatedAt)}
        </span>
      )}
    </div>
  );
}