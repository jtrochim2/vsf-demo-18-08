import { SfButtonSize, SfButtonVariant } from '@storefront-ui/shared';
import type { Image } from '@vsf-enterprise/contentful-sdk';
import { DisplayDirection } from '~/components/cms/Display/types';
import { HeroDirection } from '~/components/cms/Hero/types';

export type EntryFields<TFields> = Array<{
  fields: TFields;
}>;

export interface HeroFields {
  buttonLink: string;
  buttonRounded: boolean;
  buttonSize: SfButtonSize;
  buttonText: string;
  buttonVariant: SfButtonVariant;
  component: 'Hero';
  description: string;
  direction: `${HeroDirection}`;
  image: Image;
  subtitle: string;
  title: string;
}
export interface HeadingFields {
  className: string;
  component: 'Heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  title: string;
}

export interface CardEntryFields {
  categoryId: string;
  image: Image;
}
export interface CardFields {
  component: 'Card';
  items: {
    fields: CardEntryFields;
  }[];
}

export interface DisplayEntryFields {
  backgroundColor: string;
  buttonLink: string;
  buttonRounded: boolean;
  buttonText: string;
  description: string;
  direction: `${DisplayDirection}`;
  subtitle: string;
  title: string;
  image: Image;
}

export interface DisplayFields {
  component: 'Display';
  items: EntryFields<DisplayEntryFields>;
}

export interface ProductSliderEntryFields {
  product: string;
}
export interface ProductSliderFields {
  component: 'ProductSlider';
  items: EntryFields<ProductSliderEntryFields>;
}

export type DynamicContentFields = CardFields | HeroFields | HeadingFields | DisplayFields | ProductSliderFields;
