import { Article } from '@/libs/microcms';
import ArticleList from '../ArticleList';
import styles from './index.module.css';

type Props = {
  articles?: Article[];
};

export default function RelatedArticles({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>関連する記事</h2>
      <ArticleList articles={articles} showDate={false} />
    </div>
  );
}