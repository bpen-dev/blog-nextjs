import { createClient } from 'microcms-js-sdk';
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
} from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// ライターの型定義
export type Writer = {
  name: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId &
  MicroCMSDate;

// ブログの型定義
export type Blog = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  tags?: Tag[];
  writer?: Writer;
};

// カテゴリの型定義
export type Category = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

export type Article = Blog & MicroCMSContentId & MicroCMSDate;

// お問い合わせの型定義
export type Contact = {
  name: string;
  email: string;
  message: string;
};

// 人気のタグ用の型定義
export type PopularTag = Tag & {
  count: number;
};


if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 通常の関数群
export const getList = async (queries?: MicroCMSQueries) => { return await client.getList<Blog>({ endpoint: 'blog', queries }).catch(notFound); };
export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => { return await client.getListDetail<Blog>({ endpoint: 'blog', contentId, queries }).catch(notFound); };
export const getTagList = async (queries?: MicroCMSQueries) => { return await client.getList<Tag>({ endpoint: 'tags', queries }).catch(notFound); };
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => { return await client.getListDetail<Tag>({ endpoint: 'tags', contentId, queries }).catch(notFound); };
export const getCategoryList = async (queries?: MicroCMSQueries) => { return await client.getList<Category>({ endpoint: 'categories', queries }).catch(notFound); };
export const getCategory = async (contentId: string, queries?: MicroCMSQueries) => { return await client.getListDetail<Category>({ endpoint: 'categories', contentId, queries }).catch(notFound); };
export const createContact = async (data: Contact) => { return await client.create({ endpoint: 'contacts', content: data }); };

// Layoutで安全に使うための関数
export const getCategoryListWithoutNotFound = async (queries?: MicroCMSQueries) => {
  try { return await client.getList<Category>({ endpoint: 'categories', queries }); } catch (error) { console.error(error); return { contents: [], totalCount: 0, limit: 0, offset: 0 }; }
};

// 全件取得用のヘルパー関数
async function getAllContents<T extends { id: string }>(endpoint: string, queries: Omit<MicroCMSQueries, 'limit' | 'offset'> = {}): Promise<T[]> {
  const limit = 100;
  let allContents: T[] = [];
  let offset = 0;
  let totalCount = 0;

  do {
    const data = await client.getList<T>({ endpoint, queries: { ...queries, limit, offset } });
    allContents = [...allContents, ...data.contents];
    totalCount = data.totalCount;
    offset += data.contents.length;
  } while (allContents.length < totalCount);

  return allContents;
}

// Layoutで安全に全記事を取得する関数
export const getAllArticlesForLayout = async (queries?: Omit<MicroCMSQueries, 'limit' | 'offset'>) => {
  try {
    // ↓↓↓ ここを <Article> に修正しました ↓↓↓
    const contents = await getAllContents<Article>('blog', queries);
    return { contents, totalCount: contents.length };
  } catch (error) {
    console.error(error);
    return { contents: [], totalCount: 0 };
  }
};

// Layoutで安全に全タグを取得する関数
export const getAllTagsForLayout = async (queries?: Omit<MicroCMSQueries, 'limit' | 'offset'>) => {
  try {
    const contents = await getAllContents<Tag>('tags', queries);
    return { contents, totalCount: contents.length };
  } catch (error) {
    console.error(error);
    return { contents: [], totalCount: 0 };
  }
};