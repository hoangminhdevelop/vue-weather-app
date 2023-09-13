<template>
  <div class="flex flex-col flex-1 items-center">
    <!--Banner-->
    <div class="text-white p-4 bg-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!--Weather Overview-->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ router.params.city }}</h1>
      <p class="text-sm mb-12">
        {{ dateFormat(weatherData.currentTime) }}
        {{
          weatherData.currentTime &&
          timeFormat(weatherData.currentTime, { timeStyle: "short" })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ convertToDegreesCelsius(weatherData.current.temp) }}&deg;
      </p>
      <p class="text-center">
        Feels like
        {{ convertToDegreesCelsius(weatherData.current.feels_like) }}&deg;
      </p>
      <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
      <WeatherIcon
        :icon="weatherData.current.weather[0].icon"
        class="w-[100px] h-[100px]"
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-1 flex-col gap-4 item-center w-[50px] shrink-0"
          >
            <p class="whitespace-nowrap text-md">
              {{
                timeFormat(hourData.currentTime, {
                  hour: "numeric",
                })
              }}
            </p>
            <WeatherIcon
              :icon="hourData.weather[0].icon"
              class="w-[50px] h-[50px]"
            />
            <p class="text-xl">
              {{ convertToDegreesCelsius(hourData.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather-->
    <div class="py-12 w-full max-w-screen-md">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :day="day.dt"
          class="flex items-center justify-between"
        >
          <p class="flex-1">{{ dayFormat(day.dt) }}</p>
          <WeatherIcon class="w-[40px] h-[40px]" :icon="day.weather[0].icon" />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ convertToDegreesCelsius(day.temp.max) }}</p>
            <p>L: {{ convertToDegreesCelsius(day.temp.max) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getWeather } from "../apis";
import { dateFormat, timeFormat, dayFormat } from "../utils/date-time";
import { convertToDegreesCelsius } from "../utils/temp";

import WeatherIcon from "./WeatherIcon.vue";

const router = useRoute();
const weatherData = ref<any>(null);

const getWeatherData = async () => {
  try {
    weatherData.value = await getWeather({
      lat: router.query.lat as string,
      lng: router.query.lng as string,
    });
  } catch (error) {
    weatherData.value = null;
  }
};

await getWeatherData();
</script>

<style scoped></style>
