import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = {
  params: Promise<{ // paramsの型をPromise<T>に修正
    slug: string;
  }>;
  searchParams: Promise<{ // searchParamsの型をPromise<T>に修正
    dk?: string; // draftKey（dk）をオプションとして定義
    [key: string]: string | string[] | undefined; // 他の任意の文字列キー（stringまたはstring[]の値、あるいはundefined）も許容
  }>;
};

// パンくずリストの各項目の型
type Crumb = {
  name: string;
  href: string;
  isCategory?: boolean;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params; // props.paramsをawaitで解決
  const searchParams = await props.searchParams; // props.searchParamsをawaitで解決
  const data = await getDetail(params.slug, {
    draftKey: searchParams?.dk,
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
      canonical: `/articles/${params.slug}`, // await済みのparamsを使用
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params; // props.paramsをawaitで解決
  const searchParams = await props.searchParams; // props.searchParamsをawaitで解決
  // 修正点：getDetailに渡すパラメータを修正 (修正済み)
  const data = await getDetail(params.slug, {
    draftKey: searchParams?.dk,
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