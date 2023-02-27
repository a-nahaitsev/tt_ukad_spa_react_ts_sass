import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { fetchProducts } from '../../features/productsSlice';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { SearchIconColor } from '../../types/SearchIconColor';
import { debounce } from '../../utils/debounce';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [appliedQuery, setAppliedQuery] = useState(
    searchParams.get('search') || ''
  );
  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    if (appliedQuery) {
      searchParams.set('search', appliedQuery);
      searchParams.delete('page');
      setSearchParams(searchParams);
    } else {
      searchParams.set('page', String(currentPage));
      setSearchParams(searchParams);
    }

    dispatch(fetchProducts({ page: currentPage, query: appliedQuery }));
  }, [currentPage, appliedQuery]);

  return (
    <section className={styles.products}>
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <div className={styles.products__heading}>
            <h2 className={styles.products__title}>Product Page</h2>

            <SearchBar
              query={query}
              setQuery={setQuery}
              applyQuery={applyQuery}
              searchIconColor={SearchIconColor.Gray}
            />
          </div>

          <ul className={styles.products__content}>
            {products.map((product) => {
              const { id, image, breed_group, name } = product;

              return (
                <div className={styles.products__product} key={id}>
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

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {!isLoading && error && <p className={styles.products__title}>{error}</p>}
    </section>
  );
};
