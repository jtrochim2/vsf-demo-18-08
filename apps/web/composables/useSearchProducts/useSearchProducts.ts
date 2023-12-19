import { ProductSearchPage, ProductSearchProps } from '@vsf-enterprise/sapcc-types';
import { useSdk } from '~/sdk';

/**
 * @description Composable for managing products.
 * @example
 * const { data, loading, fetchProducts } = useSearchProducts();
 */
export const useSearchProducts = () => {
  const state = useState<{ data: null | ProductSearchPage; loading: boolean }>('products', () => ({
    data: null,
    loading: false,
  }));

  /**
   * @description Function for fetching products.
   * @example
   * fetchProducts();
   */
  const fetchProducts = async (props?: ProductSearchProps) => {
    try {
      state.value.loading = true;
      const { data, error } = await useAsyncData(() => useSdk().sapcc.searchProduct(props));
      useHandleError(error.value);
      state.value.data = data.value;
      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  return {
    fetchProducts,
    ...toRefs(state.value),
  };
};
