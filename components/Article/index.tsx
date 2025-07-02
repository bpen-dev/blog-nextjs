import { type Article as ArticleType } from '@/libs/microcms';
import { type TocItem } from '@/libs/utils';
import ArticleDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';
import Link from 'next/link';
import TableOfContents from '../TableOfContents';
import ShareButtons from '../ShareButtons';
import CodeCopy from '../CodeCopy';

type Props = {
  data: ArticleType;
  body: string;
  toc: TocItem[];
  articleUrl: string;
};

export default function Article({ data, body, toc, articleUrl }: Props) {
  return (
    <main className={styles.main}>
      <CodeCopy />
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <div className={styles.dateWrapper}>
        <ArticleDate
          publishedAt={data.publishedAt || data.createdAt}
          updatedAt={data.updatedAt}
        />
      </div>
      <div className={styles.meta}>
        {data.writer && (
          <Link href={`/writer/${data.writer.id}`} className={styles.writerLink}>
            <div className={styles.writer}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
                />
                <img
                  src={data.writer?.image?.url}
                  alt=""
                  className={styles.writerIcon}
                  width={data.writer?.image?.width}
                  height={data.writer?.image?.height}
                />
              </picture>
              <span className={styles.writerName}>{data.writer?.name}</span>
            </div>
          </Link>
        )}
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <img
          src={data.thumbnail?.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>

      <TableOfContents toc={toc} />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      <ShareButtons url={articleUrl} title={data.title} />
      <Profile writer={data.writer} />
    </main>
  );
}