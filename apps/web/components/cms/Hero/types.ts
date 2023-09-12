import type { SfButtonSize, SfButtonVariant } from '@storefront-ui/vue';
import type { MappedImage } from '@vsf-enterprise/contentful-sdk';

export enum HeroDirection {
  horizontal = 'horizontal',
  horizontalReverse = 'horizontalReverse',
}

export type HeroProps = {
  image?: MappedImage;
  title?: string;
  subtitle?: string;
  description?: string;
  direction?: `${HeroDirection}`;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: SfButtonVariant;
  buttonSize?: SfButtonSize;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonVariant?: SfButtonVariant;
  secondaryButtonSize?: SfButtonSize;
};
