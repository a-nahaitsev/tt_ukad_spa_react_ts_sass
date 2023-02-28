import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './ProductsPage.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { SearchIconColor } from '../../types/SearchIconColor';
import { debounce } from '../../utils/debounce';
import {
  setAppliedQuery,
  setCurrentPage,
  setCurrentSearchPage,
  setProductsQuery,
} from '../../features/querySlice';
import { ProductsList } from '../ProductsList';

const TOTAL_PAGES_NUMBER = 18;

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const { appliedQuery, productsQuery, currentPage, currentSearchPage } =
    useAppSelector((state) => state.query);
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryInProducts = (value: string) =>
    dispatch(setProductsQuery(value));
  const setQueryToApply = (value: string) => dispatch(setAppliedQuery(value));
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);

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
    if (appliedQuery) {
      searchParams.set('search', appliedQuery);
      searchParams.set('page', String(currentSearchPage));

      dispatch(setCurrentPage(1));
      setSearchParams(searchParams);
    } else {
      searchParams.set('page', String(currentPage));
      searchParams.delete('search');

      setSearchParams(searchParams);
    }

    dispatch(fetchProducts({ page: currentPage, query: appliedQuery }));
  }, [currentPage, appliedQuery]);

  return (
    <section className={styles.products}>
      {isLoading && <Loader />}

      {!isLoading && !error && products.length > 0 && (
        <>
          <div className={styles.products__heading}>
            <h2 className={styles.products__title}>Product Page</h2>

            <SearchBar
              query={productsQuery}
              setQuery={setQueryInProducts}
              applyQuery={applyQuery}
              searchIconColor={SearchIconColor.Gray}
            />
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
