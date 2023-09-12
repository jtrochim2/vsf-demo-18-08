import type { Product } from '@vsf-enterprise/sapcc-types';

export type CategoryPageContentProps = {
  title: string;
  subtitle?: string;
  totalProducts: number;
  itemsPerPage?: number;
  products?: Product[];
  showEmptyState?: boolean;
  showSimpleEmptyState?: boolean;
};
