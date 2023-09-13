<template>
  <div
    @click="openDetail"
    class="flex py-4 px-3 mb-4 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.location.city }}</h2>
      <h3>{{ city.location.state }}</h3>
    </div>

    <div class="flex items-center gap-2">
      <p class="text-3xl">
        {{ convertToDegreesCelsius(city.current.temp) }}&deg;
      </p>
      <WeatherIcon :icon="city.current.weather[0].icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { convertToDegreesCelsius } from "../utils/temp";
import WeatherIcon from "./WeatherIcon.vue";

const router = useRouter();

const props = defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const openDetail = () => {
  router.push({
    name: "cityView",
    params: {
      state: props.city.location.state,
      city: props.city.location.city,
    },
    query: {
      lng: props.city.location.coords.lng,
      lat: props.city.location.coords.lat,
    },
  });
};
</script>
