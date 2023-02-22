import { Image } from './Image';
import { Size } from './Size';

export interface Product {
  weight: Size;
  height: Size;
  id: number;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: Image;
  name: string;
  description: string;
  country_code: string;
}
