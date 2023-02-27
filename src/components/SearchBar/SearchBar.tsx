import classNames from 'classnames';
import React from 'react';
import { SearchIconColor } from '../../types/SearchIconColor';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  applyQuery: (value: string) => void;
  searchIconColor: SearchIconColor;
};

export const SearchBar: React.FC<Props> = ({
  query,
  setQuery,
  applyQuery,
  searchIconColor,
}) => {
  const onHandleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={styles.search}
    >
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
