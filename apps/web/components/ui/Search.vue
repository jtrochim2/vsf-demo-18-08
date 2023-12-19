<template>
  <form ref="referenceRef" role="search" class="relative" @submit.prevent="handleSubmit">
    <SfInput ref="inputReference" v-model="inputModel" aria-label="Search" placeholder="Search" @focus="open">
      <template #prefix>
        <SfIconSearch />
      </template>
      <template #suffix>
        <button
          v-if="inputModel"
          type="button"
          aria-label="Reset search"
          class="flex rounded-md focus-visible:outline focus-visible:outline-offset"
          @click="handleReset"
        >
          <SfIconCancel />
        </button>
      </template>
    </SfInput>
  </form>
</template>

<script setup lang="ts">
import { SfIconCancel, SfIconSearch, SfInput, useDisclosure } from '@storefront-ui/vue';
import { unrefElement } from '@vueuse/core';

const props = defineProps<{
  close?: () => boolean;
}>();

const router = useRouter();
const { searchTerm } = useProductSearchParams();
const { open } = useDisclosure();

const inputModel = ref(searchTerm.value);
const inputReference = ref<HTMLSpanElement>();
const handleInputFocus = () => {
  const inputElement = unrefElement(inputReference)?.querySelector('input');
  inputElement?.focus();
};
const handleReset = () => {
  inputModel.value = '';
  handleInputFocus();
};
const handleSubmit = () => {
  if (inputModel.value) {
    props.close?.();
    router.push({ path: paths.search, query: { search: inputModel.value } });
  }
};

watch(inputModel, () => {
  if (inputModel.value === '') {
    handleReset();
  }
});
watch(searchTerm, () => {
  inputModel.value = searchTerm.value;
});
</script>
