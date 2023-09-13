<template>
  <div class="flex flex-col min-h-screen bg-primary">
    <SiteNavigation />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
import { SAVED_CITY_PROVIDE_KEY } from "./constants";

export interface ISavedCity {
  id: string;
  state: string;
  city: string;
  coords: {
    lat: string;
    lng: string;
  };
}

const STORAGE_SAVED_CITY_KEY = "savedCities";

const savedCities = ref<ISavedCity[]>([]);

onMounted(() => {
  const savedCitiesInStorage = localStorage.getItem(STORAGE_SAVED_CITY_KEY);
  if (savedCitiesInStorage) {
    savedCities.value = JSON.parse(savedCitiesInStorage);
  }
});

const saveCity = (location: ISavedCity) => {
  savedCities.value.push(location);

  localStorage.setItem(
    STORAGE_SAVED_CITY_KEY,
    JSON.stringify(savedCities.value)
  );
};

provide(SAVED_CITY_PROVIDE_KEY, {
  savedCities,
  saveCity,
});
</script>
<style scoped></style>
