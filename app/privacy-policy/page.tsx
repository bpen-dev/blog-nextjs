import { Metadata } from 'next';
import Link from 'next/link'; 
// 免責事項ページと同じスタイルを共用
import styles from '../disclaimer/page.module.css';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '当ブログのプライバシーポリシーページです。',
  // 検索エンジンにインデックスさせないように設定
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>プライバシーポリシー</h1>
        <div className={styles.content}>
        <p>
            当ブログ「理系大学院生のぼちぼちITノート」（以下、「当ブログ」）は、お客様の個人情報保護の重要性について認識し、個人情報の保護に関する法律（以下、「個人情報保護法」）を遵守すると共に、以下のプライバシーポリシー（以下、「本プライバシーポリシー」）に従い、適切な取扱い及び保護に努めます。
        </p>
        
        <h2>個人情報の利用目的</h2>
        <p>
            当ブログでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
        </p>
        <p>
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        </p>

        <h2>アクセス解析ツールについて</h2>
        <p>
            当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。
        </p>
        <p>
            トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">こちら</a>をクリックしてください。
        </p>

        <h2>広告について</h2>
        <p>
            当ブログでは、第三者配信の広告サービスを利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。 
        </p>
        <p>
            クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
        </p>
        <p>
            Cookieを無効にする方法やGoogleアドセンスに関する詳細は「<a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank" rel="noopener noreferrer">広告 – ポリシーと規約 – Google</a>」をご確認ください。
        </p>

        {/* <h2>コメントについて</h2>
        <p>
            当ブログへのコメントを残す際に、IP アドレスを収集しています。
        </p>
        <p>
            これはブログの標準機能としてサポートされている機能で、スパムや荒らしへの対応以外にこのIPアドレスを使用することはありません。
        </p>
        <p>
            なお、全てのコメントは管理人が事前にその内容を確認し、承認した上での掲載となります。あらかじめご了承ください。
        </p> */}

        <h2>プライバシーポリシーの変更について</h2>
        <p>
            当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。
        </p>
        <p>
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        </p>
        </div>
        <h2>お問い合わせ</h2>
        <p>
          当社の個人情報の取扱に関するお問い合せは下記までご連絡ください。
          <br />
          <Link href="/contact" style={{ textDecoration: 'underline' }}>
            お問い合わせフォーム
          </Link>
        </p>
    </div>
  );
}