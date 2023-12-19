import { SfButtonSize, SfButtonVariant } from '@storefront-ui/vue';
import { MappedImage } from '@vsf-enterprise/contentful-sdk';

export enum DisplayDirection {
  horizontal = 'horizontal',
  horizontalReverse = 'horizontal-reverse',
  vertical = 'vertical',
}

export interface DisplayItem {
  direction?: `${DisplayDirection}`;
  image?: MappedImage;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: SfButtonVariant;
  buttonSize?: SfButtonSize;
  buttonRounded?: boolean;
  backgroundColor?: string;
}

export type DisplayProps = {
  items: DisplayItem[];
};
