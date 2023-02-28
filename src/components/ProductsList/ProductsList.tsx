import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  currentSearchPage: number;
};

const ITEMS_PER_PAGE = 10;

export const ProductsList: React.FC<Props> = ({ currentSearchPage }) => {
  const { appliedQuery } = useAppSelector((state) => state.query);
  const { products } = useAppSelector((state) => state.products);

  const visibleProducts = appliedQuery
    ? products.slice(
        currentSearchPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
        currentSearchPage * ITEMS_PER_PAGE
      )
    : products;

  return (
    <ul className={styles['products-list']}>
      {visibleProducts.map((product) => {
        const { id, image, breed_group, name } = product;

        return (
          <div className={styles['products-list__product']} key={id}>
            <ProductCard
              id={id}
              imageUrl={image.url}
              category={breed_group || 'Unknown breed'}
              title={name}
            />
          </div>
        );
      })}
    </ul>
  );
};
