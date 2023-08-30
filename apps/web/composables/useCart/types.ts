import type { Ref } from 'vue';
import type { Cart } from '@vsf-enterprise/sapcc-types';

export interface UseCartState {
  data: Cart | null;
  loading: boolean;
  isInitialized: boolean;
}

export type FetchCard = () => Promise<Ref<Cart | null>>;

export interface UseCart {
  data: Readonly<Ref<UseCartState['data']>>;
  loading: Readonly<Ref<boolean>>;
  fetchCard: FetchCard;
}

export type UseCartReturn = () => UseCart;
