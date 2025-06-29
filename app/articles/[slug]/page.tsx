import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk: string;
  };
};

// パンくずリストの各項目の型
type Crumb = {
  name: string;
  href: string;
  isCategory?: boolean;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const data = await getDetail(props.params.slug, {
    draftKey: props.searchParams.dk,
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
      canonical: `/articles/${props.params.slug}`,
    },
  };
}

export default async function Page(props: Props) {
  // 修正点：getDetailに渡すパラメータを修正
  const data = await getDetail(props.params.slug, {
    draftKey: props.searchParams.dk,
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
