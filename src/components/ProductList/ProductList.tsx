import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { init } from '../../features/productsSlice';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <section className={styles.products}>
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <h2 className={styles.products__title}>Product Page</h2>

          <ul className={styles.products__content}>
            {products.map((product) => {
              const { id, image, breed_group, name } = product;

              return (
                <div className={styles.products__product} key={id}>
                  <ProductCard
                    imageUrl={image.url}
                    category={breed_group || 'No category'}
                    title={name}
                  />
                </div>
              );
            })}
          </ul>
        </>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
