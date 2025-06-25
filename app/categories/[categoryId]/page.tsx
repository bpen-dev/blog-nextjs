import { getList, getCategory } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

// generateMetadata 関数の型定義を修正
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ categoryId: string; current: string }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const category = await getCategory(params.categoryId);
  return {
    title: `${category.name} - ${params.current}ページ目`,
    description: `「${category.name}」に関する記事一覧の${params.current}ページ目です。`,
  };
}

// Page コンポーネントの型定義を修正
export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ categoryId: string; current: string }>;
}) {
  const params = await paramsPromise;
  const current = parseInt(params.current, 10);
  const { categoryId } = params;

  const data = await getList({
    limit: LIMIT,
    offset: (current - 1) * LIMIT,
    filters: `category[equals]${categoryId}`,
  });

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        current={current}
        basePath={`/categories/${categoryId}`}
      />
    </>
  );
}