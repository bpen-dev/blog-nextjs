import { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

// 著者ページのメタデータ
export const metadata: Metadata = {
  title: '著者について',
  description: 'このブログの著者「ぼちペン」についての情報です。',
};

export default function WriterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <Image
          src="/images/profile.webp"
          alt="プロフィール画像"
          width={120}
          height={120}
          className={styles.profileImage}
        />
        <h1 className={styles.profileName}>ぼちペン</h1>
        
        <div className={styles.content}>
          <p>
            はじめまして！<br />
            「理系大学院生のぼちぼちITノート」を運営する、ぼちペンと申します。
          </p>
          <p>
            現在、理系の大学院修士2年で、2026年度からユーザー系SIerに勤務予定です。
            <br />
            個人的に資産形成や、ITの勉強に取り組んでいるため、そういった情報を発信していきます！
          </p>
          <p>
            保有資格：ITパスポート、基本情報技術者、TOEIC795点
          </p>

          <h2 className={styles.subTitle}>ブログを始めた理由</h2>
          <p>
            大きく分けて、以下の3つの理由です！
          </p>
          <ul className={styles.reasonList}>
            <li>自分から情報発信できる媒体を持ちたかった</li>
            <li>アウトプットを前提とすることで、様々なことに興味を持ち、知識を深めるモチベーションになると思った</li>
            <li>将来的に、副業の1つになりうると考えた</li>
          </ul>
          <p>
            お金を稼ぐためだけであれば、アルバlイトをする方がよっぽど効率的です。
            <br />
            それでもブログに時間をかけているのは、金銭だけではなく、それ以上の知識や経験を得たいと考えているからです。
          </p>
          <p>
            当ブログでは、「投資」と「IT」をメインテーマにして、IT業界に身を置いている方や投資をしている方に向けたお役立ち情報を発信していきます！
          </p>

          <h2 className={styles.subTitle}>SNS</h2>
          <p>
            最近、Xでいろいろ情報発信しているので、ぜひフォローをお願いします！
          </p>
          <p>
            ■X：
            <a 
              href="https://twitter.com/bochi_it" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.snsLink}
            >
              @bochi_it
            </a>
          </p>
        </div>
        <p className={styles.thanks}>
          最後までお読みいただき、ありがとうございました。
        </p>
      </div>
    </div>
  );
}