'use client';

import { GrClose } from 'react-icons/gr';
import SearchField from '@/components/SearchField';
import styles from './index.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    // ↓↓↓ JSX全体を囲むフラグメントを追加
    <>

      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className={styles.closeButton}>
            <GrClose />
          </button>
          <h3 className={styles.title}>ブログ内を検索</h3>
          <SearchField />
        </div>
      </div>
    </>
  );
}