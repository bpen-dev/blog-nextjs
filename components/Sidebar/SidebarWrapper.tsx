'use client';

import Sidebar from '@/components/Sidebar';
import { useSidebar } from '@/context/SidebarContext';
import styles from '@/app/layout.module.css';
import { Category, PopularTag } from '@/libs/microcms';

type Props = {
  categories: Category[];
  popularTags: PopularTag[];
};

export default function SidebarWrapper({ categories, popularTags }: Props) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div id="sidebar-container">
      <div
        id="sidebar-overlay"
        className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
        onClick={toggleSidebar}
      />
      <aside id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
        <Sidebar categories={categories} popularTags={popularTags} />
      </aside>
    </div>
  );
}