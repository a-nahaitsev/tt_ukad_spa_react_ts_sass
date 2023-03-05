import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAppliedQuery, setQuery } from '../../features/querySlice';
import { SearchIconColor } from '../../types/SearchIconColor';
import { debounce } from '../../utils/debounce';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  searchIconColor: SearchIconColor;
};

export const SearchBar: React.FC<Props> = ({ searchIconColor }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.query);
  const setQueryToApply = (value: string) => dispatch(setAppliedQuery(value));
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);
  const onHandleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));

    if (searchIconColor === 'gray') {
      applyQuery(event.target.value);
    }
  };

  const onHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchIconColor === 'white') {
      dispatch(setAppliedQuery(query));
      navigate({
        pathname: '/products',
        search: `?page=1&search=${query}`,
      });
    }
  };

  return (
    <form onSubmit={onHandleFormSubmit} className={styles.search}>
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
          onChange={onHandleQueryInput}
          placeholder="Search for products"
        />
      </label>
    </form>
  );
};
