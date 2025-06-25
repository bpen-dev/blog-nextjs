import { getList, getCategory } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
};

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const category = await getCategory(params.categoryId);
  return {
    title: category.name,
    description: `「${category.name}」に関する記事一覧です。`,
  };
}

export default async function Page({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const { categoryId } = params;
  const data = await getList({
    limit: LIMIT,
    filters: `category[equals]${categoryId}`,
  });

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/categories/${categoryId}`} />
    </>
  );
}