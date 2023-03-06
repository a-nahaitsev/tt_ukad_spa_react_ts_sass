import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/UKAD_logo.svg';
import { Link, NavLink, useLocation, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { SearchBar } from '../SearchBar';
import { SearchIconColor } from '../../types/SearchIconColor';
import { useAppDispatch } from '../../app/hooks';
import { setQuery } from '../../features/querySlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const setDefaultQuery = () => {
    dispatch(setQuery(''));
  };
  const location = useLocation();
  const isSearchBarShowed = location.pathname !== '/products';

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <nav className={styles.header__navigation}>
          <Link className={styles.header__logo} to="/home">
            <img src={logo} alt="UKAD logo" />
          </Link>

          <ul className={styles.header__menu}>
            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.header__link, {
                    [styles['header__link--active']]: useMatch('/') && isActive,
                  })
                }
                to={'/'}
                onClick={setDefaultQuery}
              >
                Home
              </NavLink>
            </li>

            <li className={styles.header__item}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.header__link, {
                    [styles['header__link--active']]:
                      useMatch('/products') && isActive,
                  })
                }
                to={'/products'}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>

        {isSearchBarShowed && (
          <SearchBar searchIconColor={SearchIconColor.White} />
        )}
      </div>
    </header>
  );
};
