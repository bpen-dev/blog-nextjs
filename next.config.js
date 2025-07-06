/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // --- 静的ページのリダイレクト ---
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
        destination: '/disclaimer',
        permanent: true,
      },
      
      // --- カテゴリーページのリダイレクト ---
      {
        source: '/category/:slug*',
        destination: '/categories/:slug*',
        permanent: true,
      },

      // --- 古い形式の記事パスのリダイレクト ---
      {
        source: '/posts/:slug/index.html',
        destination: '/articles/:slug',
        permanent: true,
      },

      // --- メインの記事URLのリダイレクト（最終修正） ---
      // このルールでトップページがリダイレクトされないように修正しました。
      // パスに1文字以上の文字列が存在する場合にのみ適用されます。
      {
        source: '/:slug((?!articles|categories|writer|contact|disclaimer|privacy-policy|tags|p|search|api|_next|vercel.svg|images|ogp.png|favicon.ico).+)',
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