import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/UKAD_logo.svg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <img src={logo} alt="" />
        <ul className={styles.header__menu}>
          <li className={styles.header__item}>
            <Link className={styles.header__link} to="/home">
              Home
            </Link>
          </li>

          <li className={styles.header__item}>
            <Link className={styles.header__link} to="/products">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
