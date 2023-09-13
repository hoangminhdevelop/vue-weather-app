<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback> loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<style scoped></style>
