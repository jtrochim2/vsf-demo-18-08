<template>
  <div class="flex flex-col gap-2">
    <CategoryFiltersFilterBase v-for="facet in facets" :key="`${facet.name}-${facet.values?.length}`" :facet="facet" />
  </div>
</template>

<script setup lang="ts">
import type { CategoryFiltersProps } from '~/components/CategoryFilters/types';

defineProps<CategoryFiltersProps>();
</script>
