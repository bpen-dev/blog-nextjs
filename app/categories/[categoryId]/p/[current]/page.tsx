import { getList, getCategory } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    categoryId: string;
    current: string;
  }>;
};

export async function generateMetadata({ params: paramsPromise }: Omit<Props, 'children'>): Promise<Metadata> {
  const params = await paramsPromise;
  const category = await getCategory(params.categoryId);
  return {
    title: `${category.name} - ${params.current}ページ目`,
    description: `「${category.name}」に関する記事一覧の${params.current}ページ目です。`,
  };
}

export default async function Page({ params: paramsPromise }: Props) {
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