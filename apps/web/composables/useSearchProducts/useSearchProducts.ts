import type {
  FetchProducts,
  UseSearchProductsReturn,
  UseSearchProductsState,
} from '~/composables/useSearchProducts/types';
import { useSdk } from '~/sdk';

/**
 * @description Composable for managing products.
 * @returns {@link useSearchProducts}
 * @example
 * const { data, loading, fetchProducts } = useSearchProducts();
 */
export const useSearchProducts: UseSearchProductsReturn = () => {
  const state = useState<UseSearchProductsState>('products', () => ({
    data: null,
    loading: false,
  }));

  /**
   * @description Function for fetching products.
   * @example
   * fetchProducts();
   */
  const fetchProducts: FetchProducts = async (props) => {
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
