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
        <!-- <CategoryTree :categories="categories" :parent="{ name: $t('allProducts'), href: paths.category }" /> -->
        <CategorySorting
          :options="productsCatalog?.sorts"
          :selected-option="sort"
          @on-change="(selectedValue) => (sort = selectedValue)"
        />
        <CategoryFilters :facets="productsCatalog?.facets ?? []" />
      </template>
      <template #emptyState>
        <LazyCategoryEmptyState @clear-filters="query = ''" />
      </template>
    </CategoryPageContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

definePageMeta({
  layout: false,
});

const { fetchProducts, data: productsCatalog } = useSearchProducts();
const { currentPage, pageSize, sort, query, searchTerm } = useProductSearchParams();
const { t } = useI18n();

const breadcrumbs: Breadcrumb[] = [
  { name: t('home'), link: '/' },
  { name: t('allProducts'), link: '/category' },
];
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
// const subCategories = productsCatalog.value?.subCategories;
// const categories = computed(
//   () =>
//     subCategories?.map(({ name, productCount }) => ({
//       name,
//       count: productCount || undefined,
//       href: paths.category,
//     })) || [],
// );
</script>
