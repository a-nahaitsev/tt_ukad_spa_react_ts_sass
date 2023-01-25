import React from 'react';
import { ProductList } from '../ProductList';
import styles from './Content.module.scss';

export const Content: React.FC = () => {
  return (
    <main className={styles.content}>
      <div className={styles.content__wrapper}>
        <ProductList />
      </div>
    </main>
  );
};
