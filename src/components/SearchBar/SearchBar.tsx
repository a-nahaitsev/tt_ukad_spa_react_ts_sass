import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../utils/debounce';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setIsQueryNew: (value: boolean) => void;
};

export const SearchBar: React.FC<Props> = ({
  query,
  setQuery,
  setIsQueryNew,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setQueryToApply = (value: string) => {
    searchParams.set('page', String(1));

    if (!value) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', String(value));
    }

    setIsQueryNew(true);
    setSearchParams(searchParams);
  };
  const applyQuery = useCallback(debounce(setQueryToApply, 1000), []);
  const onQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <form className={styles.search} onSubmit={onFormSubmit}>
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
