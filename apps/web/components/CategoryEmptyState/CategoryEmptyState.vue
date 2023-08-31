<template>
  <section data-testid="category-empty-state" class="flex flex-col items-center md:mt-16">
    <NuxtImg src="/images/no-products-in-category.png" :alt="$t('emptyStateAltText')" width="192" height="192" />
    <p class="mt-8 typography-text-lg font-medium">{{ $t('emptyStateText') }}</p>
    <i18n-t tag="span" keypath="emptyStateText2" class="flex items-center my-4">
      <button class="text-primary-700 underline ml-1" @click="$emit('clear-filters')">
        {{ $t('clearAllFilters') }}
      </button>
    </i18n-t>
  </section>
</template>

<script setup lang="ts">
defineEmits(['clear-filters']);
</script>
