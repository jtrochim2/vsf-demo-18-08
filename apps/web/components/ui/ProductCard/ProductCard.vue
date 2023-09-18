<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col flex-auto flex-shrink-0"
    data-testid="product-card"
  >
    <div class="relative">
      <SfLink :tag="NuxtLink" :to="`${paths.product}${slug}`">
        <NuxtImg
          :provider="imageUrl ? 'cloudinary' : undefined"
          :src="imageUrl ? cloudinaryLoader(imageUrl) : '/images/card-placeholder.png'"
          :alt="imageAlt || ''"
          class="object-cover rounded-md aspect-square w-full h-full"
          data-testid="image-slot"
          width="190"
          height="190"
          :loading="lazy && !priority ? 'lazy' : undefined"
          :fetchpriority="priority ? 'high' : undefined"
          :preload="priority"
        />
      </SfLink>
    </div>
    <div class="flex flex-col p-2 border-t border-neutral-200 flex-grow text-neutral-900">
      <SfLink
        :tag="NuxtLink"
        :to="`${paths.product}${slug}`"
        :class="[
          'typography-text-sm text-inherit no-underline hover:underline hover:!text-primary-800 active:text-primary-900 visited:!text-inherit',
          size === 'base' && 'md:typography-text-base',
        ]"
        variant="secondary"
      >
        {{ removeHtmlTags(name) }}
      </SfLink>
      <div v-if="rating" class="flex items-center pt-1">
        <SfRating size="xs" :value="rating ?? 0" :max="5" />
        <SfLink v-if="ratingCount" to="#" variant="secondary" :tag="NuxtLink" class="ml-1 no-underline">
          <SfCounter size="xs">{{ ratingCount }}</SfCounter>
        </SfLink>
      </div>
      <span
        :class="['block pb-2 font-bold text-sm mt-2', size === 'base' && 'md:text-lg']"
        data-testid="product-card-vertical-price"
      >
        {{ price?.formattedValue }}
      </span>
      <SfButton v-if="showAddToCartButton" class="mt-auto w-fit">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        <span class="md:hidden">{{ $t('addToCartShort') }}</span>
        <span class="max-md:hidden">{{ $t('addToCart') }}</span>
      </SfButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLink, SfRating, SfCounter, SfButton, SfIconShoppingCart } from '@storefront-ui/vue';
import type { ProductCardProps } from '~/components/ui/ProductCard/types';

withDefaults(defineProps<ProductCardProps>(), {
  lazy: true,
  imageAlt: '',
  showAddToCartButton: true,
  size: 'base',
});

const removeHtmlTags = (html?: string) => html?.replace(/<.*?>/g, '');
const NuxtLink = resolveComponent('NuxtLink');
</script>
