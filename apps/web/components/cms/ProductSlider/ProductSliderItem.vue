<template>
  <UiProductCard
    v-if="product"
    class="max-w-[192px]"
    :link="`/product/${product.code}`"
    :name="product.name ?? ''"
    :slug="product.code"
    :image-url="product.images?.[0]?.url ?? ''"
    :image-alt="product.images?.[0]?.altText ?? ''"
    :price="product.price"
    :show-add-to-cart-button="false"
    size="sm"
  />
</template>

<script setup lang="ts">
import type { ProductSliderItemProps } from '~/components/cms/ProductSlider/types';

const props = defineProps<ProductSliderItemProps>();

const { fetchProduct, data: product } = useProduct(props.code);

await fetchProduct({ id: props.code });
</script>
