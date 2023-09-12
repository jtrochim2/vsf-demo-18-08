<template>
  <SfAccordionItem v-model="isAccordionOpen" data-testid="filter-base">
    <template #summary>
      <div class="flex justify-between p-2 mb-2">
        <p class="mb-2 font-medium typography-headline-5">{{ facet.name }}</p>
        <SfIconChevronLeft :class="['text-neutral-500', isAccordionOpen ? 'rotate-90' : '-rotate-90']" />
      </div>
    </template>
    <template v-if="facet.name === 'Size'">
      <ul
        class="grid md:grid-cols-[repeat(auto-fill,_minmax(47px,_1fr))] grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] gap-2 justify-center px-4 pb-2"
      >
        <CategoryFiltersFilterSize
          v-for="facetValue in itemsToShow"
          :key="`${facetValue.name}-${facetValue.selected}`"
          :facet-value="facetValue"
          @update:model-value="updateSelectedFilter"
        />
      </ul>
    </template>
    <template v-else-if="facet.name === 'Colour'">
      <CategoryFiltersFilterColor
        v-for="facetValue in itemsToShow"
        :key="`${facetValue.name}-${facetValue.selected}`"
        :facet-value="facetValue"
        @update:model-value="updateSelectedFilter"
      />
    </template>
    <template v-else>
      <CategoryFiltersFilterCheckbox
        v-for="facetValue in itemsToShow"
        :key="`${facetValue.name}-${facetValue.selected}`"
        :facet-value="facetValue"
        @update:model-value="updateSelectedFilter"
      />
    </template>
    <SfButton
      v-if="isButtonVisible"
      class="mt-2 md:h-8 md:text-sm md:px-3 grayscale last:mb-4 md:last:mb-0"
      variant="tertiary"
      @click="toggleShowMore()"
    >
      {{ isShowingAllItems ? $t('showLess') : $t('showMore') }}
    </SfButton>
  </SfAccordionItem>
  <UiDivider class="my-4 last:hidden md:last:block" />
</template>

<script setup lang="ts">
import { SfAccordionItem, SfButton, SfIconChevronLeft, useDisclosure } from '@storefront-ui/vue';
import type { FacetValue } from '@vsf-enterprise/sapcc-types';
import type { FilterProps } from '~/components/CategoryFilters/types';

const props = defineProps<FilterProps>();

const { isOpen: isShowingAllItems, toggle: toggleShowMore } = useDisclosure();
const { query } = useProductSearchParams();
const isAccordionOpen = ref(true);
const maxItems = props.facet.name === 'Size' ? 15 : 5;
const isButtonVisible = props.facet.values?.length && maxItems < props.facet.values.length;

const itemsToShow = computed(
  () => (isShowingAllItems.value ? props.facet.values : props.facet.values?.slice(0, maxItems)) ?? [],
);
const updateSelectedFilter = (facetValue: FacetValue) => {
  query.value = facetValue.query?.query?.value ?? '';
};
</script>
