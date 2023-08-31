<template>
  <div class="max-w-screen-3xl mx-auto grid gap-4 md:gap-6 px-4 md:px-10 mb-10 md:grid-cols-2" data-testid="display">
    <div
      v-for="item in items"
      :key="item.title"
      class="rounded-md md:first:col-span-2"
      :style="{ backgroundColor: item.backgroundColor }"
    >
      <div
        :class="[
          'flex flex-col',
          {
            'md:flex-row-reverse': item.direction === DisplayDirection.horizontal,
            'md:flex-row': item.direction === DisplayDirection.horizontalReverse,
            'md:flex-col': item.direction === DisplayDirection.vertical,
          },
        ]"
      >
        <div class="flex flex-col basis-2/4">
          <div v-if="item.image" class="relative w-full pt-[100%]">
            <NuxtImg
              :src="`https:${item.image?.url}`"
              :alt="item.image?.alt ?? $t('displayImage')"
              class="object-cover absolute inset-0"
              loading="lazy"
              format="webp"
              sizes="md:90vw xl:45vw 2xl:728px"
            />
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-start p-4 md:p-10 basis-2/4 items-center text-center"
          :class="{
            'md:text-left md:items-start': item.direction !== DisplayDirection.vertical,
          }"
        >
          <p class="uppercase typography-text-sm block font-medium tracking-widest">
            {{ item.subtitle }}
          </p>
          <h2 class="mb-4 mt-2 font-bold typography-headline-2">
            {{ item.title }}
          </h2>
          <p class="typography-text-lg font-normal block text-center md:text-left mb-4">{{ item.description }}</p>
          <SfButton
            class="!bg-black"
            :tag="NuxtLink"
            :to="item.buttonLink"
            :variant="item.buttonVariant"
            :size="item.buttonSize"
          >
            {{ item.buttonText }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { DisplayDirection, type DisplayProps } from '~/components/cms/Display/types';

defineProps<DisplayProps>();

const NuxtLink = resolveComponent('NuxtLink');
</script>
