<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <CategoryPageContent
      v-model:current-page="currentPage"
      :items-per-page="pageSize"
      :title="$t('allProducts')"
      :total-products="productsCatalog?.pagination?.totalResults ?? 0"
      :products="productsCatalog?.products"
      :show-empty-state="!productsCatalog?.pagination?.totalResults"
    >
      <template #sidebar>
        <CategorySorting
          :options="productsCatalog?.sorts"
          :selected-option="sort"
          @on-change="(selectedValue) => (sort = selectedValue)"
        />
        <div
          class="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
          data-testid="category-filters"
        >
          {{ $t('filters') }}
        </div>
        <CategoryTree :current-category-id="currentCategoryId" />
        <CategoryFilters :facets="productsCatalog?.facets ?? []" />
      </template>
      <template #emptyState>
        <LazyCategoryEmptyState @clear-filters="query = ''" />
      </template>
    </CategoryPageContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { currentPage, pageSize, sort, query, searchTerm } = useProductSearchParams();
const { currentRoute } = useRouter();

const currentCategoryId = computed(() => currentRoute.value?.params?.slug?.at(-1) ?? '');

const searchProductsParams = computed(() => ({
  ...(currentCategoryId.value && {
    filters: {
      allCategories: [currentCategoryId.value],
    },
  }),
}));
const { fetchProducts, data: productsCatalog } = useSearchProducts();
const { data: catalogVersion, fetchCatalogVersion } = useCatalogVersion();

const { breadcrumbs } = useCategoryBreadcrumbs({
  catalogVersion,
  currentCategoryId,
});

await fetchProducts({
  pageSize: pageSize.value,
  currentPage: currentPage.value,
  sort: sort.value,
  query: query.value,
  searchTerm: searchTerm.value,
  ...searchProductsParams.value,
});
await fetchCatalogVersion();

watch([currentPage, pageSize, sort, query, searchTerm], ([currentPage, pageSize, sort, query, searchTerm]) => {
  fetchProducts({
    pageSize,
    currentPage,
    sort,
    query,
    searchTerm,
  });
});
</script>
