import classNames from 'classnames';
import React from 'react';
import { SearchIconColor } from '../../types/SearchIconColor';
import Icon from '../Icon/Icon';
import styles from './SearchBar.module.scss';

type Props = {
  searchIconColor: SearchIconColor;
};

export const SearchBar: React.FC<Props> = ({ searchIconColor }) => (
  <form action="" className={styles.search}>
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
        placeholder="Search for products"
      />
    </label>
  </form>
);
