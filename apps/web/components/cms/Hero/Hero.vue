<template>
  <div class="min-h-[600px] max-w-screen-3xl mx-auto mb-10 flex flex-col-reverse md:flex-row" data-testid="hero">
    <div class="p-4 md:p-10 md:flex md:flex-col md:justify-center md:items-start md:basis-2/4">
      <p
        class="uppercase typography-text-xs md:typography-text-base text-neutral-900 block font-medium tracking-widest"
      >
        {{ subtitle }}
      </p>
      <h1 class="mb-4 mt-2 font-bold typography-headline-2 md:typography-headline-1 md:leading-[67.5px]">
        {{ title }}
      </h1>
      <p class="typography-text-lg font-normal block md:text-left mb-4">{{ description }}</p>
      <div class="md:flex">
        <SfButton
          v-if="buttonLink"
          :tag="NuxtLink"
          :to="buttonLink"
          :size="buttonSize"
          :variant="buttonVariant"
          class="mb-4 w-full md:mb-0 md:mr-4 md:w-auto"
        >
          {{ buttonText }}
        </SfButton>
        <SfButton
          v-if="secondaryButtonLink"
          :tag="NuxtLink"
          :to="secondaryButtonLink"
          :size="secondaryButtonSize"
          :variant="secondaryButtonVariant"
        >
          {{ secondaryButtonText }}
        </SfButton>
      </div>
    </div>
    <div class="flex flex-col justify-center md:basis-2/4 md:items-stretch md:overflow-hidden">
      <NuxtImg
        v-if="image"
        :src="`https:${image.url}`"
        :alt="image.alt ?? $t('displayImage')"
        class="h-auto w-full object-cover"
        width="764"
        height="600"
        fetchpriority="high"
        format="webp"
        preload
        sizes="md:90vw xl:50vw 2xl:768px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import type { HeroProps } from '~/components/cms/Hero/types';

defineProps<HeroProps>();

const NuxtLink = resolveComponent('NuxtLink');
</script>
