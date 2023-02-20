import { Product } from '../types/Product';
import { client } from '../utils/fetch';

export const getProducts = async () => {
  const products = await client.get<Product[]>('/breeds?limit=10&page=0');

  return products || null;
};

export const getProductById = async (productId: number) => {
  const products = await getProducts();
  const product = products.find((item) => item.id === productId);

  return product || null;
};
