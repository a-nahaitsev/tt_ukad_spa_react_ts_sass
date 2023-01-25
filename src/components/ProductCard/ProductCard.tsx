import React from 'react';
import productImage from '../../assets/img/product_image_example.png';
import styles from './ProductCard.module.scss';

export const ProductCard: React.FC = () => {
  return (
    <article className={styles.product}>
      <img className={styles.product__image} src={productImage} alt="" />

      <div className={styles.product__description}>
        <span className={styles.product__category}>Hardost</span>

        <h3 className={styles.product__title}>
          Falbygdens Rekommenderar LEtivaz AOP opast hardost
        </h3>
      </div>
    </article>
  );
};
