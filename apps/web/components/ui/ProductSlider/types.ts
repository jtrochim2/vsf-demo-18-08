import type { HTMLAttributes } from 'vue';
import { SfScrollableButtonsPlacement, SfScrollableDirection } from '@storefront-ui/vue';

export enum SfScrollableScrollbar {
  hidden = 'hidden',
  always = 'always',
  auto = 'auto',
}

export interface ProductItem {
  product: string;
}

export interface ProductSliderProps {
  items: ProductItem[];
  scrollbar?: `${SfScrollableScrollbar}`;
  navigation?: `${SfScrollableButtonsPlacement}`;
  direction?: `${SfScrollableDirection}`;
  scrollSnap?: boolean;
  wrapperClass?: HTMLAttributes['class'];
}
