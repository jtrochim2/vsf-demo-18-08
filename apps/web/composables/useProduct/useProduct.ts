import { toRefs } from '@vueuse/shared';
import type { UseProductReturn, UseProductState, FetchProduct } from '~/composables/useProduct/types';
import { useSdk } from '~/sdk';

/**
 * @description Composable managing product data
 * @param {string} code Product code
 * @returns {@link UseProductReturn}
 * @example
 * const { data, loading, fetchProduct } = useProduct('product-slug');
 */
export const useProduct: UseProductReturn = (code) => {
  const state = useState<UseProductState>(`useProduct-${code}`, () => ({
    data: null,
    loading: false,
  }));

  /** Function for fetching product data
   * @param {string} params Product slug
   * @example
   * fetchProduct('product-slug');
   */
  const fetchProduct: FetchProduct = async (params) => {
    state.value.loading = true;
    const { data, error } = await useAsyncData(`useProduct-${params.id}`, () => useSdk().sapcc.getProduct(params));
    useHandleError(error.value);
    state.value.data = data.value;
    state.value.loading = false;
    return data;
  };

  return {
    fetchProduct,
    ...toRefs(state.value),
  };
};
