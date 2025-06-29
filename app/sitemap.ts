// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllArticlesForLayout, getCategoryListWithoutNotFound, getAllTagsForLayout } from '@/libs/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 環境変数からベースURLを取得
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // 1. 静的なページのルートを追加
  const staticRoutes = [
    '/',
    '/writer',
    '/contact',
    '/privacy-policy',
    '/disclaimer',
    '/categories',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  // 2. ブログ記事のルートを動的に取得
  const articles = await getAllArticlesForLayout({ fields: ['id', 'updatedAt'] });
  const articleRoutes = articles.contents.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. カテゴリページのルートを動的に取得
  const categories = await getCategoryListWithoutNotFound();
  const categoryRoutes = categories.contents.map((category) => ({
    url: `${baseUrl}/categories/${category.id}`,
    lastModified: new Date(), // カテゴリの更新日があればそれを使用
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4. タグページのルートを動的に取得
  const tags = await getAllTagsForLayout();
  const tagRoutes = tags.contents.map((tag) => ({
    url: `${baseUrl}/tags/${tag.id}`,
    lastModified: new Date(), // タグの更新日があればそれを使用
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // すべてのルートを結合して返す
  return [
    ...staticRoutes,
    ...articleRoutes,
    ...categoryRoutes,
    ...tagRoutes,
  ];
}