import type { Ref } from 'vue';
import type { Cart } from '@vsf-enterprise/sapcc-types';

export interface UseCartState {
  data: Cart | null;
  loading: boolean;
  isInitialized: boolean;
}

export type FetchCart = () => Promise<Ref<Cart | null>>;

export interface UseCart {
  data: Readonly<Ref<UseCartState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCart: FetchCart;
}

export type UseCartReturn = () => UseCart;
