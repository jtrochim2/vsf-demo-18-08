<template>
  <li data-testid="filter-size" class="flex flex-wrap">
    <SfChip
      size="sm"
      class="w-full md:sf-chip-sm md:h-8 h-10"
      :input-props="{ value: facetValue.name }"
      v-model="selectedFilter"
      @update:model-value="$emit('update:modelValue', facetValue)"
    >
      <span class="leading-4 text-center">{{ facetValue.name }}</span>
    </SfChip>
  </li>
</template>

<script setup lang="ts">
import { SfChip } from '@storefront-ui/vue';
import type { FilterItemEmits, FilterItemProps } from '~/components/CategoryFilters/types';

defineEmits<FilterItemEmits>();
const props = defineProps<FilterItemProps>();
const selectedFilter = ref(props.facetValue.selected);
</script>
