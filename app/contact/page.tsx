import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm/index';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'お問い合わせフォームです。',
};

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>お問い合わせ</h1>
      <p className={styles.description}>
        ご質問やご相談など、お気軽にお問い合わせください。
      </p>
      <ContactForm />
    </div>
  );
}