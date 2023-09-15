<template>
  <NuxtLazyHydrate when-visible>
    <UiProductSlider
      v-bind="{ ...$attrs, ...props }"
      :wrapper-class="['max-w-screen-3xl mx-auto px-4 md:px-10 mb-20']"
    />
  </NuxtLazyHydrate>
</template>

<script setup lang="ts">
import type { ProductSliderProps } from '~/components/cms/ProductSlider/types';

const props = defineProps<ProductSliderProps>();
</script>
