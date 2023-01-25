import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/img/UKAD_logo.svg';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <img src={logo} alt="" />
        <ul className={styles.header__menu}>
          <li className={styles.header__item}>
            <a className={styles.header__link} href="#">
              Home
            </a>
          </li>

          <li className={styles.header__item}>
            <a className={styles.header__link} href="#">
              Products
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
