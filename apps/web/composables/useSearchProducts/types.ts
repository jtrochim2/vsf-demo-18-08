import type { ProductSearchPage, ProductSearchProps } from '@vsf-enterprise/sapcc-types';

export interface UseSearchProductsState {
  data: ProductSearchPage | null;
  loading: boolean;
}
export type FetchProducts = (props?: ProductSearchProps) => Promise<Ref<ProductSearchPage | null>>;
export interface UseSearchProducts {
  data: Readonly<Ref<UseSearchProductsState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchProducts: FetchProducts;
}
export type UseSearchProductsReturn = () => UseSearchProducts;
