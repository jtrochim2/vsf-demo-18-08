<template>
  <SfScrollable buttons-placement="floating" class="pb-4" :wrapper-class="wrapperClass" data-testid="product-slider">
    <slot />
  </SfScrollable>
</template>

<script setup lang="ts">
import { SfScrollable } from '@storefront-ui/vue';
import type { ProductSliderProps } from '~/components/ui/ProductSlider/types';

defineProps<ProductSliderProps>();
</script>
