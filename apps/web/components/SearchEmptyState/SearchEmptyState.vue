<template>
  <section data-testid="search-empty-state" class="flex flex-col items-center md:mt-16 max-w-[632px] p-4 m-auto">
    <NuxtImg src="/images/no-results-found.png" :alt="$t('emptyStateAltText')" width="192" height="192" />
    <p class="mt-4 typography-text-lg font-medium">{{ $t('emptyState.search.heading') }}</p>
    <span class="flex text-center mt-4">{{ $t('emptyState.search.text') }} </span>
    <SfButton
      :tag="NuxtLink"
      :to="paths.category"
      class="mt-4 w-full max-w-screen-xs md:max-w-[200px]"
      variant="secondary"
    >
      {{ $t('navbarButtonText') }}
    </SfButton>
  </section>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';

const NuxtLink = resolveComponent('NuxtLink');
</script>
