<template>
  <SfListItem
    tag="label"
    size="sm"
    :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': selectedFilter }]"
    :selected="selectedFilter"
    data-testid="filter-color"
  >
    <template #prefix>
      <input
        v-model="selectedFilter"
        :value="facetValue.name"
        class="appearance-none peer"
        type="checkbox"
        @update:model-value="$emit('update:modelValue', facetValue)"
      />
      <span
        class="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline"
      >
        <SfThumbnail size="sm" :style="{ backgroundColor: facetValue.name }" />
      </span>
    </template>
    <p>
      <span class="mr-2 typography-text-sm">{{ facetValue.name }}</span>
      <SfCounter size="sm">{{ facetValue.count }}</SfCounter>
    </p>
  </SfListItem>
</template>

<script setup lang="ts">
import { SfCounter, SfListItem, SfThumbnail } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';

defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();

const selectedFilter = ref(props.facetValue.selected);
</script>
