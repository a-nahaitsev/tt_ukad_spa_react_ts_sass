import { Image } from '../types/Image';
import { Product } from '../types/Product';
import { client } from '../utils/fetch';

export const getProducts = async ({ query = '' }) => {
  // const products = await client.get<Product[]>(
  //   `/breeds?limit=10&page=${page - 1}`
  // );

  let products = await client.get<Product[]>(`/breeds/search?q=${query}`);
  products = products.filter(
    (product) =>
      product.hasOwnProperty('reference_image_id') &&
      product.reference_image_id !== ''
  );

  products = await Promise.all(
    products.map(async (product) => {
      const image = await client.get<Image>(
        `/images/${product.reference_image_id}`
      );

      console.log(product, image);

      return { ...product, image };
    })
  );

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
