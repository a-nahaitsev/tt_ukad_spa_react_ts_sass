import { Image } from '../types/Image';
import { Product } from '../types/Product';
import { client } from '../utils/fetch';

export const getProducts = async () => {
  const products = await client.get<Product[]>('/breeds?limit=10&page=0');

  return products || null;
};

export const getProductById = async (productId: number) => {
  const product = await client.get<Product>(`/breeds/${productId}`);
  const image = await client.get<Image>(
    `/images/${product.reference_image_id}`
  );

  product.image = image;

  return product || null;
};
