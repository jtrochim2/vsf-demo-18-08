import type { Price, VariantOptionQualifier } from '@vsf-enterprise/sapcc-types';

export type CartProductCardProps = {
  attributes: VariantOptionQualifier[];
  imageUrl?: string | null;
  imageAlt?: string | null;
  maxValue: number;
  minValue: number;
  name: string;
  price: Price;
  value: number;
  code: string;
};
