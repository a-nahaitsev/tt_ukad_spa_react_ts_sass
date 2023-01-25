import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <span className={styles.footer__text}>2021 © copyright</span>
      </div>
    </footer>
  );
};
