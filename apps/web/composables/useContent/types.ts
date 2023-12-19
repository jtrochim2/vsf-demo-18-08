import type { Ref } from 'vue';
import type { GetContentParams } from '@vsf-enterprise/contentful-sdk';
import type { Maybe } from '@vue-storefront/unified-data-model';
import type { DynamicContentFields, EntryFields } from '~/helpers/cms/types';

export enum ComponentNames {
  Hero = 'Hero',
  Card = 'Card',
  Heading = 'Heading',
  Display = 'Display',
  ProductSlider = 'ProductSlider',
}

export interface ContentfulDynamicPage {
  component: 'Page';
  content: EntryFields<DynamicContentFields>;
  name: string;
  url: string;
}

export interface UseContentState {
  data: Maybe<EntryFields<ContentfulDynamicPage>>;
  loading: boolean;
}

export type GetContent = () => Promise<Ref<Maybe<EntryFields<GetContentParams>>>>;

export interface UseContent {
  data: Readonly<Ref<UseContentState['data']>>;
  loading: Readonly<Ref<boolean>>;
  getContent: GetContent;
}

export type UseContentReturn = (params: GetContentParams) => UseContent;
