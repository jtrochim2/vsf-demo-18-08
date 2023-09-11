import type { ProductSliderProps as ProductSliderBlockProps, ProductItem } from '~/components/ui/ProductSlider/types';

export interface ProductSliderProps extends Omit<ProductSliderBlockProps, 'products'> {
  items: ProductItem[];
}
