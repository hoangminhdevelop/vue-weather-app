<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink to="/">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p>The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-secondary duration-150 cursor-pointer"
        ></i>
        <i
          v-if="!existCityInStorage"
          @click="addCity"
          class="fa-solid fa-plus text-xl hover:text-secondary duration-150 cursor-pointer"
        ></i>
      </div>

      <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div></BaseModal
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { uid } from "uid";
import BaseModal from "./BaseModal.vue";
import { ISavedCity } from "../App.vue";
import { SAVED_CITY_PROVIDE_KEY } from "../constants";

const route = useRoute();

const modalActive = ref(false);
const { savedCities, saveCity } = inject(SAVED_CITY_PROVIDE_KEY) as any;
const existCityInStorage = ref<boolean>(false);

watch(route, (newRoute, _) => {
  existCityInStorage.value =
    savedCities.value.findIndex((city: ISavedCity) => {
      return city.city === newRoute.params.city;
    }) >= 0;
});

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const addCity = () => {
  const locationObj: ISavedCity = {
    id: uid(),
    state: route.params.state as string,
    city: route.params.city as string,
    coords: {
      lat: route.query.lat as string,
      lng: route.query.lng as string,
    },
  };

  saveCity(locationObj);

  existCityInStorage.value = true;
};
</script>

<style lang="scss" scoped></style>
