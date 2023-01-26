import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <section className={styles.products}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h2 className={styles.products__title}>Product Page</h2>
          <ul className={styles.products__content}>
            {products.map((product) => {
              const { id, image, breed_group, name } = product;

              return (
                <ProductCard
                  key={id}
                  imageUrl={image.url}
                  category={breed_group || 'No category'}
                  title={name}
                />
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
