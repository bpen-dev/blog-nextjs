'use client';

import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi'; // アイコンをインポート
import styles from './index.module.css';

export default function SearchField() {
  const [composing, setComposition] = useState(false);
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      location.href = `/search?q=${inputRef.current.value}`;
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.code === 'Enter' && !composing) {
        handleSubmit(e);
      }
    },
    [composing]
  );

  return (
    // formタグで全体を囲む
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="search"
        name="q"
        ref={inputRef}
        className={styles.search}
        placeholder="キーワードを入力..." // プレースホルダーを分かりやすく
        onKeyDown={handleKeyDown}
        onCompositionStart={startComposition}
        onCompositionEnd={endComposition}
        defaultValue={defaultQuery}
      />
      <button type="submit" className={styles.button}>
        <FiSearch />
      </button>
    </form>
  );
}