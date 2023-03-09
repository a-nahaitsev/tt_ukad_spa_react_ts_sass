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
  const [isQueryNew, setIsQueryNew] = useState(true);
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialQuery = searchParams.get('search') || '';
  const isSearchedProducts = Boolean(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (!initialQuery) {
      setQuery('');
      dispatch(fetchProducts({ page: initialPage }));
    }

    if (initialQuery && isQueryNew) {
      dispatch(fetchProducts({ query: initialQuery }));
      setIsQueryNew(false);
    }
  }, [initialQuery, initialPage]);

  return (
    <section className={styles.products}>
      <div className={styles.products__heading}>
        <h2 className={styles.products__title}>Product Page</h2>

        <SearchBar
          query={query}
          setQuery={setQuery}
          setIsQueryNew={setIsQueryNew}
        />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <ProductsList
            isSearchedProducts={isSearchedProducts}
            page={initialPage}
          />
          <Pagination
            isSearchedProducts={isSearchedProducts}
            initialPage={initialPage}
          />
        </>
      )}

      {!isLoading && !error && !products.length && (
        <p className={styles.products__title}>
          {'There are no products with your request:'}
          <br />
          {`Page number - "${initialPage}"`}
          <br />
          {`Search word - "${initialQuery}"`}
        </p>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
