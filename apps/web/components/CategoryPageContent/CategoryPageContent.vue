<template>
  <NarrowContainer>
    <div class="mb-20 px-4 md:px-0" data-testid="category-layout">
      <h1 class="my-10 font-bold typography-headline-3 md:typography-headline-2">{{ title }}</h1>
      <p v-if="subtitle" class="mb-4 font-medium typography-text-base">{{ subtitle }}</p>
      <div class="md:flex gap-6" data-testid="category-page-content">
        <CategorySidebar :is-open="isOpen" @close="close" v-if="!showSimpleEmptyState">
          <NuxtLazyHydrate when-visible>
            <slot name="sidebar" />
          </NuxtLazyHydrate>
        </CategorySidebar>
        <div class="flex-1" v-if="!showSimpleEmptyState" data-testid="category-content">
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold font-headings md:text-lg">
              {{ $t('numberOfProducts', { count: totalProducts }) }}
            </span>
            <SfButton @click="open" variant="tertiary" class="md:hidden whitespace-nowrap">
              <template #prefix>
                <SfIconTune />
              </template>
              {{ $t('listSettings') }}
            </SfButton>
          </div>
          <section
            v-if="!showEmptyState"
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
            data-testid="category-grid"
          >
            <NuxtLazyHydrate
              when-visible
              v-for="({ code, name, averageRating, price, images, url }, index) in products"
              :key="code"
            >
              <UiProductCard
                :name="name ?? ''"
                :rating="averageRating"
                :link="url ?? ''"
                :price="price"
                :image-url="images?.find((image) => image.format === 'product')?.url ?? ''"
                :image-alt="images?.find((image) => image.format === 'product')?.altText ?? ''"
                :slug="code"
                :priority="index === 0"
              />
            </NuxtLazyHydrate>
          </section>
          <template v-else>
            <slot name="emptyState" />
          </template>
          <NuxtLazyHydrate when-visible>
            <UiPagination
              v-if="totalProducts > itemsPerPage"
              @update:current-page="$emit('update:currentPage', $event)"
              :current-page="currentPage + 1"
              :total-items="totalProducts"
              :page-size="itemsPerPage"
              :max-visible-pages="maxVisiblePages"
            />
          </NuxtLazyHydrate>
        </div>
        <template v-if="showSimpleEmptyState">
          <slot name="simpleEmptyState" />
        </template>
      </div>
    </div>
  </NarrowContainer>
</template>

<script setup lang="ts">
import { SfButton, SfIconTune, useDisclosure } from '@storefront-ui/vue';
import { whenever } from '@vueuse/core';
import type { CategoryPageContentProps } from '~/components/CategoryPageContent/types';

const {
  public: { NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES },
} = useRuntimeConfig();

const props = withDefaults(defineProps<CategoryPageContentProps>(), {
  itemsPerPage: 24,
  showEmptyState: false,
  showSimpleEmptyState: false,
});
defineEmits<(e: 'update:currentPage', currentPage: number) => number>();

const { isOpen, open, close } = useDisclosure();
const { isTablet, isDesktop } = useBreakpoints();
const maxVisiblePages = computed(() => (isDesktop.value ? Number(NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES) : 1));

if (!import.meta.env.SSR) {
  watch(
    () => props.currentPage,
    () => (document.documentElement.scrollTop = 0),
  );
}

whenever(isTablet, close);
</script>
