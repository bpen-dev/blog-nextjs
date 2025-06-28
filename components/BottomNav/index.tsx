'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiArrowUp, FiMenu, FiX } from 'react-icons/fi';
import { useSidebar } from '@/context/SidebarContext';
import SearchField from '@/components/SearchField'; // 検索フィールドを直接利用
import styles from './index.module.css'; // スタイルを統合

export default function BottomNav() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // モーダル表示時に背景をスクロールさせない
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* --- ボトムナビゲーション本体 --- */}
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

      {/* --- 検索モーダルのロジックとJSX --- */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} className={styles.closeButton}>
              <FiX />
            </button>
            <h3 className={styles.modalTitle}>ブログ内を検索</h3>
            <SearchField />
          </div>
        </div>
      )}
    </>
  );
}