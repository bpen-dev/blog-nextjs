/** @type {import('next').NextConfig} */
const nextConfig = {
  // この redirects 関数を追加します
  async redirects() {
    return [
      // 1. 静的ページのリダイレクト（例：/writer_info/ → /writer）
      {
        source: '/writer_info',
        destination: '/writer',
        permanent: true,
      },
      {
        source: '/menseki',
        destination: '/disclaimer',
        permanent: true,
      },
      {
        source: '/riyokiyaku',
        destination: '/disclaimer', // 利用規約も免責事項へ
        permanent: true,
      },
      // 2. カテゴリーページのリダイレクト (例: /category/aws/ → /categories/aws)
      {
        source: '/category/:slug',
        destination: '/categories/:slug',
        permanent: true,
      },
      // 3. 古い形式の記事パスのリダイレクト (例: /posts/IAM/index.html → /articles/IAM)
      {
        source: '/posts/:slug/index.html',
        destination: '/articles/:slug',
        permanent: true,
      },
      // 4. メインの記事URLのリダイレクト (例: /s3_cloudfront/ → /articles/s3_cloudfront)
      // 注意: このルールは他の静的ページに影響しないよう、最後に記述します
      {
        source: '/:slug((?!privacy-policy|disclaimer|contact|writer|categories|tags|p|search).*)',
        destination: '/articles/:slug',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;