<template>
  <div v-for="({ fields }, index) in content" :key="`${fields.component}-${index}`">
    <RenderContent :content="fields.content" />
  </div>
</template>

<script setup lang="ts">
const contentfulContentParams = {
  custom: {
    field: 'url',
    value: 'home-page',
    type: 'pageDynamic',
  },
};

const { getContent, data: content } = useContent(contentfulContentParams);

getContent();
</script>
