<template>
  <div class="w-full md:max-w-[376px]" data-testid="category-sorting">
    <h6 class="bg-neutral-100 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest">
      {{ $t('sortBy') }}
    </h6>
    <div class="px-4">
      <SfSelect v-model="selected" :aria-label="$t('sortBy')" @change="$emit('on-change', selected)">
        <option v-for="{ code } in options" :key="code" :value="code" :selected="code === selected">
          {{ $t(`sortType.${code}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfSelect } from '@storefront-ui/vue';
import type { CategorySortingProps, SortingEmits } from '~/components/CategorySorting/types';

const props = defineProps<CategorySortingProps>();
defineEmits<SortingEmits>();

const { options, selectedOption } = toRefs(props);
const selected = ref(selectedOption?.value);
</script>
