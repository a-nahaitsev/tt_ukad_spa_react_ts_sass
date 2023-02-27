import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/UKAD_logo.svg';
import { Link, NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';
// import { SearchBar } from '../SearchBar';
// import { SearchIconColor } from '../../types/SearchIconColor';

const navLinks = [
  { id: 1, to: '/', text: 'Home' },
  { id: 2, to: '/products', text: 'Products' },
];

export const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__wrapper}>
      <nav className={styles.header__navigation}>
        <Link className={styles.header__logo} to="/home">
          <img src={logo} alt="UKAD logo" />
        </Link>

        <ul className={styles.header__menu}>
          {navLinks.map(({ id, to, text }) => (
            <li className={styles.header__item} key={id}>
              <NavLink
                className={({ isActive }) =>
                  classNames(styles.header__link, {
                    [styles['header__link--active']]: useMatch(to) && isActive,
                  })
                }
                to={to}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* <SearchBar searchIconColor={SearchIconColor.White} /> */}
    </div>
  </header>
);
