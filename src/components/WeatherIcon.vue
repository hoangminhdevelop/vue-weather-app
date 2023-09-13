<template>
  <img
    class="object-cover"
    :src="`http://openweathermap.org/img/wn/${icon}@2x.png`"
    alt=""
  />
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
