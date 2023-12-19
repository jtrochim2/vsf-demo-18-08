<template>
  <div
    class="relative flex first:border-t border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] p-4 last:mb-0"
    data-testid="cart-product-card"
  >
    <div class="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
      <SfLink :tag="NuxtLink" :to="`${paths.product}${code}`">
        <!-- TODO: replace src for :src="cloudinaryLoader(imageUrl)" when an image comes from SAP -->
        <NuxtImg
          provider="cloudinary"
          class="w-full h-auto border rounded-md border-neutral-200"
          :src="imageUrl ?? '/images/product.webp'"
          :alt="imageAlt ?? ''"
          width="300"
          height="300"
          loading="lazy"
        />
      </SfLink>
      <div class="absolute top-0 left-0 text-white bg-secondary-600 py-1 pl-1.5 pr-2 text-xs font-medium">
        <SfIconSell size="xs" class="mr-1" />
        {{ $t('sale') }}
      </div>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <SfLink
        :tag="NuxtLink"
        :to="`${paths.product}${code}`"
        variant="secondary"
        class="no-underline typography-text-sm sm:typography-text-lg"
      >
        {{ name }}
      </SfLink>
      <div class="my-2 sm:mb-0">
        <ul class="text-xs font-normal leading-5 sm:typography-text-sm text-neutral-700">
          <li v-for="attribute in attributes" :key="attribute.name">
            <span class="mr-1">{{ attribute.name }}:</span>
            <span class="font-medium">{{ attribute.value }}</span>
          </li>
        </ul>
      </div>
      <div class="items-start sm:items-center sm:mt-auto flex flex-col sm:flex-row">
        <span class="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
          {{ price.formattedValue }}
        </span>
        <UiQuantitySelector :min-value="minValue" :max-value="maxValue" class="mt-4 sm:mt-0" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfLink, SfIconSell } from '@storefront-ui/vue';
import type { CartProductCardProps } from '~/components/ui/CartProductCard/types';

defineProps<CartProductCardProps>();

const NuxtLink = resolveComponent('NuxtLink');
</script>
