import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './SearchForm.module.scss';

export const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate({
      pathname: '/products',
      search: `?page=1&search=${query}`,
    });
  };

  return (
    <form onSubmit={onFormSubmit} className={styles['search-form']}>
      <label className={styles['search-form__container']}>
        <Icon
          icon="search"
          className={classNames(
            styles['search-form__icon'],
            styles[`search-form__icon-white`]
          )}
        />

        <input
          className={styles['search-form__text']}
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
    </form>
  );
};
