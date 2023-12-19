<template>
  <CategoryPageContent
    v-if="productsCatalog"
    v-model:current-page="currentPage"
    :items-per-page="pageSize"
    :title="$t('resultsFor', { phrase: searchTerm })"
    :subtitle="productsCatalog?.pagination?.totalResults ? '' : $t('emptyState.search.subtitle')"
    :total-products="productsCatalog?.pagination?.totalResults ?? 0"
    :products="productsCatalog?.products"
    :show-simple-empty-state="!productsCatalog?.pagination?.totalResults"
  >
    <template #sidebar>
      <CategorySorting
        :options="productsCatalog?.sorts"
        :selected-option="sort"
        @on-change="(selectedValue) => (sort = selectedValue)"
      />
      <CategoryFilters :facets="productsCatalog?.facets ?? []" />
    </template>
    <template #simpleEmptyState>
      <LazySearchEmptyState />
    </template>
  </CategoryPageContent>
</template>

<script setup lang="ts">
const { currentPage, pageSize, sort, query, searchTerm } = useProductSearchParams();
const { fetchProducts, data: productsCatalog } = useSearchProducts();

await fetchProducts({
  pageSize: pageSize.value,
  currentPage: currentPage.value,
  sort: sort.value,
  query: query.value,
  searchTerm: searchTerm.value,
});

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
