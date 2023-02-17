import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/products';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setError,
  setIsLoading,
  setProduct,
} from '../../features/productSlice';
// import styles from './ProductInfo.module.scss';

export const ProductInfo: React.FC = () => {
  const { productId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);

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

  return <section>{product?.name}</section>;
};
