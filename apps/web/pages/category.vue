<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs">
    <CategoryPageContent
      :title="$t('allProducts')"
      :total-products="productsCatalog?.pagination?.totalResults ?? 0"
      :products="productsCatalog?.products"
      :show-empty-state="!productsCatalog?.pagination?.totalResults"
    >
      <!-- <template #sidebar>
        <CategoryTree :categories="categories" :parent="{ name: $t('allProducts'), href: paths.category }" />
        <CategorySorting />
        <CategoryFilters :facets="productsCatalog.facets" />
      </template> -->
      <template #emptyState>
        <LazyCategoryEmptyState />
      </template>
    </CategoryPageContent>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/components/ui/Breadcrumbs/types';

definePageMeta({
  layout: false,
});

const config = useRuntimeConfig();
const { fetchProducts, data: productsCatalog } = useSearchProducts();
const { t } = useI18n();
const pageSize = Number(config.public.NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE);

const breadcrumbs: Breadcrumb[] = [
  { name: t('home'), link: '/' },
  { name: t('allProducts'), link: '/category' },
];

await fetchProducts({ pageSize });
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
