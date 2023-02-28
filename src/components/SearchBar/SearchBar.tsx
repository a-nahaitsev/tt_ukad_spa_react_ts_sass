import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { setAppliedQuery } from '../../features/querySlice';
import { SearchIconColor } from '../../types/SearchIconColor';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  applyQuery?: (value: string) => void;
  searchIconColor: SearchIconColor;
};

export const SearchBar: React.FC<Props> = ({
  query,
  setQuery,
  applyQuery,
  searchIconColor,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onHandleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (applyQuery) {
      applyQuery(event.target.value);
    }
  };

  const onHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit', applyQuery);
    event.preventDefault();

    if (!applyQuery) {
      console.log('settter works', query);
      dispatch(setAppliedQuery(query));
      navigate('/products');
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
