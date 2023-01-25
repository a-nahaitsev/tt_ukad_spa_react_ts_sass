import React from 'react';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export const ProductList: React.FC = () => {
  return (
    <section className={styles.products}>
      <h2 className={styles.products__title}>Product Page</h2>
      <ul className={styles.products__content}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ul>
    </section>
  );
};
