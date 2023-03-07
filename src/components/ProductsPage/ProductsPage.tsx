import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './ProductsPage.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { ProductsList } from '../ProductsList';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [queryFromUrl] = useState(searchParams.get('search') || '');
  const isSearchedProducts = Boolean(queryFromUrl);

  useEffect(() => {
    if (!queryFromUrl) {
      dispatch(fetchProducts({ page }));
    } else {
      dispatch(fetchProducts({ query: queryFromUrl }));
    }
  }, []);

  return (
    <section className={styles.products}>
      <div className={styles.products__heading}>
        <h2 className={styles.products__title}>Product Page</h2>

        <SearchBar queryFromUrl={queryFromUrl} />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <ProductsList isSearchedProducts={isSearchedProducts} page={page} />
          <Pagination
            isSearchedProducts={isSearchedProducts}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </>
      )}

      {!isLoading && !error && !products.length && (
        <p className={styles.products__title}>
          {`There are no products with this search word "${queryFromUrl}"`}
        </p>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
