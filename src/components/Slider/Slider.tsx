import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './Slider.module.scss';
import arrowImg from '../../assets/img/arrow_right.svg';

export const Slider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductsFromServer = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getProductsFromServer();
    console.log(products);
  }, []);

  return (
    <section className={styles.slider}>
      <h3 className={styles.slider__title}>Home Page</h3>

      <div className={styles.slider__content}>
        <ul className={styles.slider__items}>
          {products.slice(0, 8).map((product) => {
            const { id, image, breed_group, name } = product;

            return (
              <li className={styles.slider__item} key={id}>
                <ProductCard
                  imageUrl={image.url}
                  category={breed_group || 'No category'}
                  title={name}
                />
              </li>
            );
          })}
        </ul>

        <button
          className={classNames(
            styles.slider__button,
            styles['slider__button--left']
          )}
          type="button"
        >
          <img src={arrowImg} alt="arrow" />
        </button>
        <button
          className={classNames(
            styles.slider__button,
            styles['slider__button--right']
          )}
          type="button"
        >
          <img src={arrowImg} alt="arrow" />
        </button>
      </div>
    </section>
  );
};
