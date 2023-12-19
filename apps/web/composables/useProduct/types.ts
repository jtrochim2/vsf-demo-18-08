import type { Ref } from 'vue';
import type { Product, ProductGetProps } from '@vsf-enterprise/sapcc-types';

export interface UseProductState {
  data: Product | null;
  loading: boolean;
}

export type FetchProduct = (params: ProductGetProps) => Promise<Ref<Product | null>>;

export interface UseProduct {
  data: Readonly<Ref<UseProductState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProduct: FetchProduct;
}

export type UseProductReturn = (slug: string) => UseProduct;
