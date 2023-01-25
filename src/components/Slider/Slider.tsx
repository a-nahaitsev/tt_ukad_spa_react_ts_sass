import classNames from 'classnames';
import React from 'react';
import { ProductCard } from '../ProductCard';
import styles from './Slider.module.scss';

export const Slider: React.FC = () => {
  return (
    <section className={styles.slider}>
      <h3 className={styles.slider__title}>Home Page</h3>

      <div className={styles.slider__content}>
        <ul className={styles.slider__items}>
          <li className={styles.slider__item}>
            <ProductCard />
          </li>
          <li className={styles.slider__item}>
            <ProductCard />
          </li>
          <li className={styles.slider__item}>
            <ProductCard />
          </li>
          <li className={styles.slider__item}>
            <ProductCard />
          </li>
          <li className={styles.slider__item}>
            <ProductCard />
          </li>
        </ul>

        <button
          className={classNames(
            styles.slider__button,
            styles['slider__button--left']
          )}
          type="button"
        >
          &lsaquo;
        </button>
        <button
          className={classNames(
            styles.slider__button,
            styles['slider__button--right']
          )}
          type="button"
        >
          &rsaquo;
        </button>
      </div>
    </section>
  );
};
