import type { Product } from '@vsf-enterprise/sapcc-types';

export type CategoryPageContentProps = {
  title: string;
  totalProducts: number;
  itemsPerPage?: number;
  products?: Product[];
};
