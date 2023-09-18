<template>
  <template v-if="subcategories">
    <SfAccordionItem v-model="isOpen" class="w-full md:max-w-[376px]" data-testid="category-tree">
      <template #summary>
        <div class="flex justify-between py-2 pl-4 pr-3">
          <p class="font-medium typography-headline-5">{{ $t('category') }}</p>
          <SfIconChevronLeft class="text-neutral-500" :class="{ 'rotate-90': isOpen, '-rotate-90': !isOpen }" />
        </div>
      </template>

      <CategoryTreeItem
        v-if="parent"
        :href="breadcrumbs?.[breadcrumbs.length - 2].link || paths.category"
        class="!mt-0"
      >
        <SfIconArrowBack size="sm" class="text-neutral-500 mr-2" />
        {{ $t('allFromCategory', { name: parent.name }) }}
      </CategoryTreeItem>
      <CategoryTreeItem v-else-if="currentCategoryBreadcrumb" :href="paths.category" class="!mt-0">
        <SfIconArrowBack size="sm" class="text-neutral-500 mr-2" />
        {{ $t('allProducts') }}
      </CategoryTreeItem>
      <CategoryTreeItem
        v-if="currentCategoryBreadcrumb"
        :href="
          createCategoryUrl({
            categories: currentCategoryBreadcrumb.facetValueName,
            id: currentCategoryBreadcrumb.facetValueCode,
          })
        "
        selected
        class="mt-2"
      >
        {{ currentCategoryBreadcrumb.facetValueName }}
      </CategoryTreeItem>

      <div data-testid="categories" class="mt-2">
        <CategoryTreeItem
          v-for="{ id, name } in subcategories.slice(0, showMore ? subcategories.length : Number(maxVisibleCategories))"
          :key="id"
          :href="
            createCategoryUrl({
              categories: slugify(name),
              id,
            })
          "
        >
          {{ name }}
        </CategoryTreeItem>
        <SfButton
          v-if="hasShowMoreButton"
          class="mt-2 md:h-8 md:text-sm md:px-3 grayscale"
          @click="toggleShowMore()"
          variant="tertiary"
        >
          {{ showMore ? $t('showLess') : $t('showMore') }}
        </SfButton>
      </div>
    </SfAccordionItem>
    <UiDivider class="my-4" />
  </template>
</template>

<script setup lang="ts">
import { SfAccordionItem, SfButton, useDisclosure, SfIconChevronLeft, SfIconArrowBack } from '@storefront-ui/vue';
import type { CategoryHierarchy } from '@vsf-enterprise/sapcc-types';
import type { CategoryTreeProps } from '~/components/CategoryTree/types';

const {
  public: { NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES: maxVisibleCategories },
} = useRuntimeConfig();

const props = defineProps<CategoryTreeProps>();
const { currentCategoryId } = toRefs(props);

const { data: productsCatalog, loading } = useSearchProducts();
const { data: catalogVersion } = useCatalogVersion();
const parent = ref();
const subcategories = ref<CategoryHierarchy[]>([]);
const currentCategoryBreadcrumb = ref();

const { breadcrumbs } = useCategoryBreadcrumbs({
  catalogVersion,
  currentCategoryId,
});

watch(
  loading,
  (loading) => {
    if (loading) return;
    const result = useCategoryTree({ productsCatalog, catalogVersion, currentCategoryId });

    parent.value = result.parent.value;
    subcategories.value = result.subcategories.value;
    currentCategoryBreadcrumb.value = productsCatalog.value?.breadcrumbs?.find(
      ({ facetValueCode }) => facetValueCode === currentCategoryId.value,
    );
  },
  { immediate: true },
);
const { isOpen } = useDisclosure({ initialValue: true });
const { isOpen: showMore, toggle: toggleShowMore } = useDisclosure();

const hasShowMoreButton = computed(() => {
  return (
    subcategories.value.length > Number(maxVisibleCategories) ||
    (subcategories.value.length ?? 0) > Number(maxVisibleCategories)
  );
});

const { createCategoryUrl } = useCreateUrl();
</script>
