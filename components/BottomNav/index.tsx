'use client';

import { useState, useEffect, useRef } from 'react'; // useEffectとuseRefをインポート
import { FiSearch, FiArrowUp, FiMenu } from 'react-icons/fi';
import SearchModal from '@/components/SearchModal';
import styles from './index.module.css';

export default function BottomNav() {
  const [isModalOpen, setModalOpen] = useState(false);

  // --- ↓↓↓ ここからスクロール制御のロジックを追加 ↓↓↓ ---

  // メニューが表示されているかどうかの状態
  const [isVisible, setIsVisible] = useState(true);
  // 前回のスクロール位置を保持するためのuseRef
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ページ最上部では常に表示
      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // スクロールアップで表示、スクロールダウンで非表示
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // 上にスクロール
      } else {
        setIsVisible(false); // 下にスクロール
      }
      
      // 現在のスクロール位置を保存
      lastScrollY.current = currentScrollY;
    };

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数：コンポーネントがアンマウントされる時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 空の依存配列で、コンポーネントのマウント時に一度だけ実行

  // --- ↑↑↑ ここまでがスクロール制御のロジック ---


  // ページトップにスムーズにスクロールする関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // サイドバーの表示/非表示を切り替える関数
  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      const isShown = sidebar.classList.contains(styles.show);
      if (isShown) {
        sidebar.classList.remove(styles.show);
      } else {
        sidebar.classList.add(styles.show);
      }
    }
  };

  return (
    <>
      {/* ↓↓↓ classNameに表示/非表示用のクラスを動的に追加 */}
      <nav className={`${styles.nav} ${isVisible ? '' : styles.hidden}`}>
        <button onClick={() => setModalOpen(true)} className={styles.item}>
          <FiSearch size={24} />
          <span>検索</span>
        </button>

        <button onClick={scrollToTop} className={styles.item}>
          <FiArrowUp size={24} />
          <span>上へ</span>
        </button>

        <button onClick={toggleSidebar} className={styles.item}>
          <FiMenu size={24} />
          <span>メニュー</span>
        </button>
      </nav>
      <SearchModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}