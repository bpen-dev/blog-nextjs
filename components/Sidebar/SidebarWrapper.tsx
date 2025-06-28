'use client';

import Sidebar from '@/components/Sidebar';
import { useSidebar } from '@/context/SidebarContext';
import styles from '@/app/layout.module.css';
import { Category } from '@/libs/microcms';

type Props = {
  categories: Category[];
};

export default function SidebarWrapper({ categories }: Props) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div id="sidebar-container">
      <div
        id="sidebar-overlay"
        className={`${styles.overlay} ${isOpen ? styles.show : ''}`}
        onClick={toggleSidebar}
      />
      <aside id="sidebar" className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
        <Sidebar categories={categories} />
      </aside>
    </div>
  );
}