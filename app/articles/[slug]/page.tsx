import { Metadata } from 'next';
import { getDetail } from '@/libs/microcms';
import Article from '@/components/Article';
import Breadcrumbs from '@/components/Breadcrumbs';
import { processRichText } from '@/libs/utils';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk?: string;
    [key: string]: string | string[] | undefined;
  }>;
};

type Crumb = {
  name: string;
  href: string;
  isCategory?: boolean;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
      canonical: `/articles/${params.slug}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const data = await getDetail(params.slug, {
    draftKey: searchParams?.dk,
    depth: 1,
  });

  const { body, toc } = processRichText(data.content);

  const crumbs: Crumb[] = [{ name: 'ホーム', href: '/' }];

  if (data.category) {
    crumbs.push({
      name: data.category.name,
      href: `/categories/${data.category.id}`,
      isCategory: true,
    });
  }

  crumbs.push({
    name: data.title,
    href: `/articles/${data.id}`,
  });

  // 記事の完全なURLを構築
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const articleUrl = `${baseUrl}/articles/${data.id}`;

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <Article data={data} body={body} toc={toc} articleUrl={articleUrl} />
    </>
  );
}