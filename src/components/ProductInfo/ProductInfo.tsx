import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setError,
  setIsLoading,
  setProduct,
} from '../../features/productSlice';
import styles from './ProductInfo.module.scss';

export const ProductInfo: React.FC = () => {
  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);
  const { products } = useAppSelector((state) => state.products);
  const productImage = products.find(
    (item) => item.reference_image_id === product?.reference_image_id
  )?.image;

  const getProductFromServer = async (id: string) => {
    try {
      dispatch(setIsLoading(true));
      const productFromServer = await getProductById(Number(id));

      dispatch(setProduct(productFromServer));
    } catch (error: any) {
      dispatch(setError('Product has not been loaded. Try again later.'));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getProductFromServer(productId);
  }, []);

  return (
    <section className={styles.info}>
      <h2 className={styles.info__title}>{product?.name}</h2>

      <div className={styles.info__content}>
        <div className={styles['info__image-container']}>
          <img
            src={productImage?.url}
            alt={product?.name}
            className={styles.info__image}
          />
        </div>

        <div className={styles.info__description}>
          <h5 className={styles['info__description-title']}>Characteristics</h5>

          <ul className={styles.info__properties}>
            <li className={styles.info__property}>
              <span>Weight (imperial)</span>
              <span className={styles['info__property-value']}>
                {product?.weight.imperial}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Weight (metric)</span>
              <span className={styles['info__property-value']}>
                {product?.weight.metric}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Height (imperial)</span>
              <span className={styles['info__property-value']}>
                {product?.height.imperial}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Height (metric)</span>
              <span className={styles['info__property-value']}>
                {product?.height.metric}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Bred for</span>
              <span className={styles['info__property-value']}>
                {product?.bred_for || '-'}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Breed group</span>
              <span className={styles['info__property-value']}>
                {product?.breed_group || '-'}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Life span</span>
              <span className={styles['info__property-value']}>
                {product?.life_span}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Temperament</span>
              <span className={styles['info__property-value']}>
                {product?.temperament}
              </span>
            </li>

            <li className={styles.info__property}>
              <span>Origin</span>
              <span className={styles['info__property-value']}>
                {product?.origin || '-'}
              </span>
            </li>
          </ul>

          {product?.description && (
            <>
              <h5 className={styles['info__description-title']}>Description</h5>

              <p>{product.description}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
