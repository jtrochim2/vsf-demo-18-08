<template>
  <div
    class="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
    data-testid="category-filters"
  >
    {{ $t('filters') }}
  </div>
  <div class="flex flex-col gap-2">
    <CategoryFiltersFilterBase v-for="facet in facets" :key="`${facet.name}-${facet.values?.length}`" :facet="facet" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

defineProps<CategoryFiltersProps>();
</script>
