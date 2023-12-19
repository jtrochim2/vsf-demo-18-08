<template>
  <SfListItem
    :key="facetValue.name"
    tag="label"
    size="sm"
    :disabled="!facetValue.count"
    :class="['px-1.5 bg-transparent hover:bg-transparent', { 'font-medium': selectedFilter }]"
    data-testid="filter-checkbox"
  >
    <template #prefix>
      <SfCheckbox
        v-model="selectedFilter"
        class="flex items-center"
        :disabled="!facetValue.count"
        :value="facetValue.name"
        @update:model-value="$emit('update:modelValue', facetValue)"
      />
    </template>
    <p>
      <span class="mr-2 text-sm">{{ facetValue.name }}</span>
      <SfCounter size="sm">{{ facetValue.count }}</SfCounter>
    </p>
  </SfListItem>
</template>
<script setup lang="ts">
import { SfCheckbox, SfCounter, SfListItem } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';

defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();

const selectedFilter = ref(props.facetValue.selected);
</script>
