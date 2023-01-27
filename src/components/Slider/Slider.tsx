import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './Slider.module.scss';
import arrowImg from '../../assets/img/arrow_right.svg';
import { Loader } from '../Loader';
import {
  CARDS_NUMBER_IN_SLIDER,
  CARDS_NUMBER_TO_SHOW,
  CARD_WIDTH_WITH_GAP,
} from './Slider.constants';

export const Slider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shift, setShift] = useState(0);

  const getProductsFromServer = async () => {
    try {
      setIsLoading(true);
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  const maxShift =
    -(products.slice(0, CARDS_NUMBER_IN_SLIDER).length - CARDS_NUMBER_TO_SHOW) *
    CARD_WIDTH_WITH_GAP;

  const onRightButton = () => {
    setShift((currentShift) => {
      if (currentShift > maxShift) {
        return currentShift - CARD_WIDTH_WITH_GAP;
      }

      return currentShift;
    });
  };

  const onLeftButton = () => {
    setShift((currentShift) => {
      if (currentShift < 0) {
        return currentShift + CARD_WIDTH_WITH_GAP;
      }

      return 0;
    });
  };

  const isLeftButtonHidden = !shift;
  const isRightButtonHidden = shift === maxShift;

  return (
    <section className={styles.slider}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h3 className={styles.slider__title}>Home Page</h3>
          <div className={styles.slider__content}>
            <div className={styles.slider__wrapper}>
              <ul
                className={styles.slider__items}
                style={{ transform: `translateX(${shift}px)` }}
              >
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
            </div>

            <button
              className={classNames(
                styles.slider__button,
                styles['slider__button--left'],
                { [styles['slider__button--hidden']]: isLeftButtonHidden }
              )}
              type="button"
              onClick={onLeftButton}
            >
              <img src={arrowImg} alt="arrow" />
            </button>

            <button
              className={classNames(
                styles.slider__button,
                styles['slider__button--right'],
                { [styles['slider__button--hidden']]: isRightButtonHidden }
              )}
              type="button"
              onClick={onRightButton}
            >
              <img src={arrowImg} alt="arrow" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
