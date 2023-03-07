import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from '../../utils/debounce';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  queryFromUrl: string;
};

export const SearchBar: React.FC<Props> = ({ queryFromUrl }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(queryFromUrl);
  const setQueryToApply = (value: string) => {
    searchParams.set('page', String(1));

    if (!value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', String(value));
    }

    setSearchParams(searchParams);
    navigate(0);
  };
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);
  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <form className={styles.search}>
      <label className={styles.search__container}>
        <Icon
          icon="search"
          className={classNames(
            styles.search__icon,
            styles[`search__icon-gray`]
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
