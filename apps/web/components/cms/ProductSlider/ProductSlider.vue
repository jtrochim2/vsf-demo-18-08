<template>
  <NuxtLazyHydrate when-visible>
    <UiProductSlider v-bind="{ ...$attrs, ...props }" :wrapper-class="['max-w-screen-3xl mx-auto px-4 md:px-10 mb-20']">
      <CmsProductSliderItem v-for="code in productIds" :key="code" :code="code" />
    </UiProductSlider>
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import type { ProductSliderProps } from '~/components/cms/ProductSlider/types';

const props = defineProps<ProductSliderProps>();

const productIds = props.items.map(({ product }) => product.split('/').pop()).filter(Boolean) as string[];
</script>
