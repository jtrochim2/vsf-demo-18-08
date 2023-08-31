import type { Price } from '@vsf-enterprise/sapcc-types';

export type ProductCardProps = {
  name?: string;
  link: string;
  imageUrl: string;
  imageAlt?: string;
  price?: Price;
  rating?: number;
  ratingCount?: number;
  sku?: string;
  slug?: string;
  showAddToCartButton?: boolean;
  priority?: boolean;
  lazy?: boolean;
};
