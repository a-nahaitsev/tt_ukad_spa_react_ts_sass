import React from 'react';
import styles from './ProductCard.module.scss';

type Props = {
  imageUrl: string;
  category: string;
  title: string;
};

export const ProductCard: React.FC<Props> = ({ imageUrl, category, title }) => (
  <article className={styles.product}>
    <div className={styles['product__image-container']}>
      <img className={styles.product__image} src={imageUrl} alt={title} />
    </div>

    <div className={styles.product__description}>
      <span className={styles.product__category}>{category}</span>

      <h3 className={styles.product__title}>{title}</h3>
    </div>
  </article>
);
