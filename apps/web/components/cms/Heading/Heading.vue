<template>
  <component
    :is="tag"
    class="text-center mb-6 font-bold typography-headline-3 md:typography-headline-2"
    data-testid="heading"
  >
    {{ title }}
  </component>
</template>

<script setup lang="ts">
import type { HeadingProps } from '~/components/cms/Heading/types';

withDefaults(defineProps<HeadingProps>(), {
  tag: 'h1',
});
</script>
