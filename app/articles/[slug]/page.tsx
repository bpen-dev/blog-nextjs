import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// パンくずリストの各項目の型
type Crumb = {
  name: string;
  href: string;
  isCategory?: boolean;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const data = await getDetail(params.slug, {
    draftKey: Array.isArray(searchParams?.dk) ? searchParams?.dk[0] : searchParams?.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || ''],
    },
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getDetail(params.slug, {
    draftKey: Array.isArray(searchParams?.dk) ? searchParams?.dk[0] : searchParams?.dk,
    depth: 1, 
  });

  // パンくずリスト用のデータを構築
  const crumbs: Crumb[] = [{ name: 'ホーム', href: '/' }];

  // 記事にカテゴリが設定されている場合、カテゴリをパンくずリストに追加
  if (data.category) {
    crumbs.push({
      name: data.category.name,
      href: `/categories/${data.category.id}`,
      isCategory: true,
    });
  }

  // 現在の記事タイトルを最後の項目として追加
  crumbs.push({
    name: data.title,
    href: `/articles/${data.id}`,
  });

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <Article data={data} />
    </>
  );
}