'use client';

import { useState } from 'react';
import styles from './index.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  // ↓↓↓ エラーメッセージを保存するための状態を追加 ↓↓↓
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(''); // 送信開始時にエラーメッセージをリセット

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // ↓↓↓ ここから修正 ↓↓↓
        // エラーレスポンスからメッセージを取得
        const errorData = await res.json();
        // 具体的なエラーメッセージをセットし、ステータスをerrorにする
        setErrorMessage(errorData.error || 'メッセージの送信に失敗しました。');
        setStatus('error');
        // ↑↑↑ ここまで修正 ↑↑↑
      }
    } catch (error) {
      console.error(error);
      // ネットワークエラーなど、予期せぬエラーの場合
      setErrorMessage('ネットワークエラーが発生しました。時間をおいて再度お試しください。');
      setStatus('error');
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ... (フォームのinput要素などは変更なし) ... */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            お名前
          </label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            お問い合わせ内容
          </label>
          <textarea
            id="message"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={status === 'loading'}
          ></textarea>
        </div>
        <button type="submit" className={styles.button} disabled={status === 'loading'}>
          {status === 'loading' ? '送信中...' : '送信'}
        </button>
      </form>
      {status === 'success' && (
        <p className={styles.successMessage}>
          お問い合わせありがとうございます。メッセージは正常に送信されました。
        </p>
      )}
      {/* ↓↓↓ ここを修正 ↓↓↓ */}
      {status === 'error' && (
        <p className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
      {/* ↑↑↑ ここまで修正 ↑↑↑ */}
    </>
  );
}