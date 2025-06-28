'use client';

import { GrClose } from 'react-icons/gr';
import SearchField from '@/components/SearchField';
import styles from './index.module.css';

// Propsの型定義を修正
type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function SearchModal({ isOpen, setIsOpenAction }: Omit<Props, 'setIsOpen'> & { setIsOpenAction: (isOpen: boolean) => void }) {
    if (!isOpen) {
        return null;
    }

    // 閉じる関数をコンポーネント内で定義
    const handleClose = () => {
        setIsOpenAction(false);
    };

    return (
        <>
            <div className={styles.overlay} onClick={handleClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <button onClick={handleClose} className={styles.closeButton}>
                        <GrClose />
                    </button>
                    <h3 className={styles.title}>ブログ内を検索</h3>
                    <SearchField />
                </div>
            </div>
        </>
    );
}