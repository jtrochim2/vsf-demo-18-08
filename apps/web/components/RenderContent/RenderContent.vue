<template>
  <div data-testid="render-content">
    <template v-for="(component, index) in content">
      <CmsHero
        v-if="component.fields.component === ComponentNames.Hero"
        v-bind="withUnwrappedImage(component.fields)"
        :key="`${ComponentNames.Hero}-${index}`"
        :data-testid="`render-content-${component.fields.component}`"
      />
      <CmsHeading
        v-else-if="component.fields.component === ComponentNames.Heading"
        v-bind="component.fields"
        :key="`${ComponentNames.Heading}-${index}`"
        :data-testid="`render-content-${component.fields.component}`"
      />
      <CmsCategoryCard
        v-else-if="component.fields.component === ComponentNames.Card"
        v-bind="toCardContentProps(component.fields)"
        :key="`${ComponentNames.Card}-${index}`"
        :data-testid="`render-content-${component.fields.component}`"
      />
      <CmsDisplay
        v-else-if="component.fields.component === ComponentNames.Display"
        v-bind="toDisplayProps(component.fields)"
        :key="`${ComponentNames.Display}-${index}`"
        :data-testid="`render-content-${component.fields.component}`"
      />
      <CmsProductSlider
        v-else-if="component.fields.component === ComponentNames.ProductSlider"
        v-bind="toProductSliderProps(component.fields)"
        :key="`${ComponentNames.ProductSlider}-${index}`"
        :data-testid="`render-content-${component.fields.component}`"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MappedImage, Image } from '@vsf-enterprise/contentful-sdk';
import type { RenderContentProps } from '~/components/RenderContent/types';
import type { CategoryCardProps } from '~/components/cms/CategoryCard/types';
import type { DisplayProps } from '~/components/cms/Display/types';
import type { ProductSliderProps } from '~/components/cms/ProductSlider/types';
import type { ComponentNames } from '~/composables/useContent/types';
import type { CardFields, DisplayFields, ProductSliderFields } from '~/helpers/cms/types';
import { useSdk } from '~/sdk';

const withUnwrappedImage = <TFields extends { image: Image }>(
  item: TFields,
): Omit<TFields, 'image'> & { image: MappedImage } => ({
  ...item,
  image: useSdk().contentful.utils.getImageObject(item.image),
});

const toCardContentProps = (fields: CardFields): CategoryCardProps => ({
  ...fields,
  items: fields.items.map((item) => withUnwrappedImage(item.fields)),
});

const toDisplayProps = (fields: DisplayFields): DisplayProps => ({
  ...fields,
  items: fields.items.map((item) => withUnwrappedImage(item.fields)),
});

const toProductSliderProps = (fields: ProductSliderFields): ProductSliderProps => ({
  ...fields,
  items: fields.items.map((item) => item.fields),
});

defineProps<RenderContentProps>();
</script>
