'use client';

import { useEffect } from 'react';
import styles from './index.module.css';

const CodeCopy = () => {
  useEffect(() => {
    const copyButtons = document.querySelectorAll<HTMLButtonElement>('.copy-code-button');

    const handleClick = async (event: MouseEvent) => {
      const button = event.currentTarget as HTMLButtonElement;
      // ボタンの次の要素（<pre>タグ）を取得
      const pre = button.nextElementSibling as HTMLPreElement | null;

      if (pre && pre.tagName === 'PRE') {
        const code = pre.querySelector('code');
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.innerText);
          button.textContent = 'コピーしました!';
          button.classList.add(styles.copied);
          setTimeout(() => {
            button.textContent = 'コピー';
            button.classList.remove(styles.copied);
          }, 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          button.textContent = 'コピー失敗';
          setTimeout(() => {
            button.textContent = 'コピー';
          }, 2000);
        }
      }
    };

    copyButtons.forEach(button => {
      button.addEventListener('click', handleClick);
    });

    // クリーンアップ関数
    return () => {
      copyButtons.forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []); // このEffectはマウント時に一度だけ実行

  return null; // このコンポーネント自体は何もレンダリングしない
};

export default CodeCopy;