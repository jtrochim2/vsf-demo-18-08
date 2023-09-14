<template>
  <NuxtLink :to="href" class="block first-of-type:mt-2">
    <SfListItem
      size="sm"
      tag="span"
      :class="[
        'rounded-md active:bg-primary-100 !py-1.5',
        { 'bg-primary-100 hover:bg-primary-100 active:bg-primary-100 font-medium': selected },
      ]"
      data-testid="category-tree-item"
    >
      <span class="flex gap-2 items-center">
        <slot />
        <SfCounter v-if="Number(count) > -1" class="md:text-sm font-normal">{{ count }}</SfCounter>
      </span>
      <template #suffix>
        <SfIconCheck v-if="selected" size="sm" class="text-primary-700" />
      </template>
    </SfListItem>
  </NuxtLink>
</template>

<script setup lang="ts">
import { SfCounter, SfIconCheck, SfListItem } from '@storefront-ui/vue';
import type { CategoryTreeItemType } from '~/components/CategoryTree/types';

defineProps<CategoryTreeItemType>();
</script>
