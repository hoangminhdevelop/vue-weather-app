<template>
  <div>
    <CityCard
      v-for="city in savedCitiesWeather"
      :city="city"
      :key="city.current.dt"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { SAVED_CITY_PROVIDE_KEY } from "../constants";
import { ISavedCity } from "../App.vue";
import CityCard from "./CityCard.vue";
import { getWeather } from "../apis";

const { savedCities } = inject<any>(SAVED_CITY_PROVIDE_KEY);
const savedCitiesWeather = ref<any>([]);

const getCitiesData = async () => {
  const requests: any[] = [];

  savedCities.value.forEach(({ coords }: ISavedCity) => {
    requests.push(getWeather({ lat: coords.lat, lng: coords.lng }));
  });
  savedCitiesWeather.value = await Promise.all(requests);
  savedCitiesWeather.value.forEach((weather: any, index: number) => {
    weather.location = savedCities.value[index];
  });
};
await getCitiesData();
</script>

<style scoped></style>
