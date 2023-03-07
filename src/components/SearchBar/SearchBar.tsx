import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery } from '../../features/querySlice';
import { SearchIconColor } from '../../types/SearchIconColor';
import { debounce } from '../../utils/debounce';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  setPage?: (value: number) => void;
  setQueryFromUrl?: (value: string) => void;
  searchIconColor: SearchIconColor;
};

export const SearchBar: React.FC<Props> = ({
  setPage,
  setQueryFromUrl,
  searchIconColor,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { query } = useAppSelector((state) => state.query);
  const setQueryToApply = (value: string) => {
    if (setQueryFromUrl && setPage) {
      setPage(1);
      setQueryFromUrl(value);
      dispatch(setQuery(value));
      searchParams.set('page', String(1));
      searchParams.set('search', String(value));
      setSearchParams(searchParams);
    }
  };
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);
  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));

    if (searchIconColor === 'gray') {
      applyQuery(event.target.value);
    }
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchIconColor === 'white') {
      navigate({
        pathname: '/products',
        search: `?page=1&search=${query}`,
      });
    }
  };

  return (
    <form onSubmit={onFormSubmit} className={styles.search}>
      <label className={styles.search__container}>
        <Icon
          icon="search"
          className={classNames(
            styles.search__icon,
            styles[`search__icon-${searchIconColor}`]
          )}
        />

        <input
          className={styles.search__text}
          type="text"
          value={query}
          onChange={onQueryInput}
          placeholder="Search for products"
        />
      </label>
    </form>
  );
};
