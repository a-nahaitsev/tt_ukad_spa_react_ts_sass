import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './ProductsPage.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { SearchIconColor } from '../../types/SearchIconColor';
import {
  setCurrentPage,
  setCurrentSearchPage,
} from '../../features/querySlice';
import { ProductsList } from '../ProductsList';

const TOTAL_PAGES_NUMBER = 18;

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const { appliedQuery, currentSearchPage, currentPage } = useAppSelector(
    (state) => state.query
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageFromUrl] = useState(Number(searchParams.get('page')) || 1);
  const [queryFromUrl] = useState(searchParams.get('search') || '');

  const paginationProps = appliedQuery
    ? {
        totalPagesNumber: Math.ceil(products.length / 10),
        currentPage: currentSearchPage,
        setCurrentPage: (value: number) =>
          dispatch(setCurrentSearchPage(value)),
      }
    : {
        totalPagesNumber: TOTAL_PAGES_NUMBER,
        currentPage: currentPage,
        setCurrentPage: (value: number) => dispatch(setCurrentPage(value)),
      };

  useEffect(() => {
    console.log(pageFromUrl, queryFromUrl);
    if (appliedQuery) {
      searchParams.set('page', String(currentSearchPage));
      searchParams.set('search', appliedQuery);
      setSearchParams(searchParams);

      dispatch(fetchProducts({ query: appliedQuery }));
    } else {
      searchParams.set('page', String(currentPage));
      searchParams.delete('search');
      setSearchParams(searchParams);

      dispatch(fetchProducts({ page: currentPage }));
    }
  }, [appliedQuery]);

  useEffect(() => {
    if (!appliedQuery) {
      searchParams.set('page', String(currentPage));
      searchParams.delete('search');
      setSearchParams(searchParams);

      dispatch(fetchProducts({ page: currentPage }));
    }
  }, [currentPage]);

  useEffect(() => {
    if (appliedQuery) {
      searchParams.set('page', String(currentSearchPage));
      searchParams.set('search', appliedQuery);

      setSearchParams(searchParams);
    }
  }, [currentSearchPage]);

  return (
    <section className={styles.products}>
      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className={styles.products__heading}>
            <h2 className={styles.products__title}>Product Page</h2>

            <SearchBar searchIconColor={SearchIconColor.Gray} />
          </div>

          <ProductsList />

          <Pagination properties={paginationProps} />
        </>
      )}

      {!isLoading && !error && !products.length && (
        <p className={styles.products__title}>
          {`There are no products with this query "${appliedQuery}"`}
        </p>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
