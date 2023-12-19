import type { MappedImage } from '@vsf-enterprise/contentful-sdk';

interface CategoryWithImage {
  image: MappedImage;
  categoryId: string;
  name?: string;
}

export type CategoryCardProps = {
  items: CategoryWithImage[];
};
