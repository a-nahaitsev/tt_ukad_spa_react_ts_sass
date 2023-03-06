import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setQuery } from '../../features/querySlice';
import styles from './ProductCard.module.scss';

type Props = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
};

export const ProductCard: React.FC<Props> = ({
  id,
  imageUrl,
  category,
  title,
}) => {
  const dispatch = useAppDispatch();
  const setDefaultQuery = () => dispatch(setQuery(''));

  return (
    <article className={styles.product}>
      <Link to={`/products/${id}`} onClick={setDefaultQuery}>
        <div className={styles['product__image-container']}>
          <img className={styles.product__image} src={imageUrl} alt={title} />
        </div>

        <div className={styles.product__description}>
          <span className={styles.product__category}>{category}</span>

          <h3 className={styles.product__title}>{title}</h3>
        </div>
      </Link>
    </article>
  );
};
