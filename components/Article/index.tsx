import { type Article } from '@/libs/microcms';
import { type TocItem } from '@/libs/utils'; // 修正: TocItemをインポート
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';
import Link from 'next/link';
import TableOfContents from '../TableOfContents'; // 修正: 目次コンポーネントをインポート

type Props = {
  data: Article;
  body: string; // 修正: 本文のHTML
  toc: TocItem[]; // 修正: 目次データ
};

export default function Article({ data, body, toc }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <div className={styles.dateWrapper}>
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      {/* <p className={styles.description}>{data.description}</p> */}
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

      {/* 修正: アイキャッチ画像の下に目次を挿入 */}
      <TableOfContents toc={toc} />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: body, // 修正: IDが付与された本文HTMLを使用
        }}
      />
      <Profile writer={data.writer} />
    </main>
  );
}