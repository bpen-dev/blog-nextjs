'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from 'react-share';
import { FiCopy } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import styles from './index.module.css';

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // クライアントサイドでのみ window.location.href を使用する
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      // タイトルとURLを組み合わせたテキストをコピーする
      const textToCopy = `${title}\n${currentUrl}`;
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2秒後にメッセージを消す
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!currentUrl) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>記事をシェアする</p>
      <div className={styles.buttons}>
        <TwitterShareButton url={currentUrl} title={title}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <LineShareButton url={currentUrl} title={title}>
          <LineIcon size={40} round />
        </LineShareButton>
        <button onClick={handleCopy} className={styles.copyButton}>
          <FiCopy size={20} />
        </button>
      </div>
      {isCopied && <p className={styles.copyMessage}>コピーしました！</p>}
    </div>
  );
}