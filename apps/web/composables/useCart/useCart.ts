import type { Cart } from '@vsf-enterprise/sapcc-types';
import { toRefs } from '@vueuse/shared';
import Cookies from 'js-cookie';
import type { UseCartReturn, UseCartState, FetchCard } from '~/composables/useCart/types';
import { useSdk } from '~/sdk';

const cookieCartId = 'vsf-cartId';
/**
 * @description Composable for managing cart.
 * @returns {@link UseCartReturn}
 * @example
 * const { data, loading } = useCart();
 */
export const useCart: UseCartReturn = () => {
  const state = useState<UseCartState>('useCart', () => ({
    data: null,
    loading: false,
    isInitialized: false,
  }));

  /**
   * @description Function for fetching the cart.
   * @example
   * getCart();
   */
  const fetchCard: FetchCard = async () => {
    const cartId = Cookies.get(cookieCartId);
    state.value.loading = true;

    try {
      const { data, error } = await useAsyncData<Cart>(() =>
        cartId ? useSdk().sapcc.getCart({ cartId }) : useSdk().sapcc.createCart(),
      );

      useHandleError(error.value);
      state.value.data = data.value;

      // TODO [>=1.0.0]: For logged in users, we should use cart.code instead of cart.guid
      Cookies.set(cookieCartId, data.value?.guid ?? '');

      return data;
    } catch (error) {
      throw new Error(error as string);
    } finally {
      state.value.loading = false;
    }
  };

  onMounted(async () => {
    if (!state.value.isInitialized) {
      state.value.isInitialized = true;

      await nextTick();
      await fetchCard();
    }
  });

  return {
    fetchCard,
    ...toRefs(state.value),
  };
};
