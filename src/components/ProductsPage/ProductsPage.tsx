import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './ProductsPage.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { SearchIconColor } from '../../types/SearchIconColor';
import { setCurrentSearchPage, setQuery } from '../../features/querySlice';
import { ProductsList } from '../ProductsList';

const TOTAL_PAGES_NUMBER = 18;

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const { currentSearchPage, query } = useAppSelector((state) => state.query);

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [queryFromUrl, setQueryFromUrl] = useState(
    searchParams.get('search') || ''
  );

  const paginationProps =
    query || queryFromUrl
      ? {
          totalPagesNumber: Math.ceil(products.length / 10),
          currentPage: currentSearchPage,
          setCurrentPage: (value: number) =>
            dispatch(setCurrentSearchPage(value)),
        }
      : {
          totalPagesNumber: TOTAL_PAGES_NUMBER,
          currentPage: page,
          setCurrentPage: setPage,
        };

  useEffect(() => {
    if (!queryFromUrl) {
      searchParams.set('page', String(page || 1));
      searchParams.delete('search');
      setSearchParams(searchParams);
      dispatch(fetchProducts({ page }));
    }
  }, [page, queryFromUrl]);

  useEffect(() => {
    if (queryFromUrl) {
      dispatch(setQuery(queryFromUrl));
      dispatch(setCurrentSearchPage(page));
      dispatch(fetchProducts({ query: queryFromUrl }));
    }
  }, [queryFromUrl]);

  useEffect(() => {
    dispatch(setCurrentSearchPage(1));
  }, [query]);

  return (
    <section className={styles.products}>
      <div className={styles.products__heading}>
        <h2 className={styles.products__title}>Product Page</h2>

        <SearchBar
          setPage={setPage}
          setQueryFromUrl={setQueryFromUrl}
          searchIconColor={SearchIconColor.Gray}
        />
      </div>

      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <ProductsList />
          <Pagination properties={paginationProps} />
        </>
      )}

      {!isLoading && !error && !products.length && (
        <p className={styles.products__title}>
          {`There are no products with this parameter`}
        </p>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
