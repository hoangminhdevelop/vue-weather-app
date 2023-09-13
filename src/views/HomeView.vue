<template>
  <Suspense>
    <main class="container text-white">
      <div class="pt-4 mb-8 relative">
        <input
          type="text"
          v-model="searchQuery"
          @input="getSearchResult"
          placeholder="Search for a city or state"
          class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
        />
        <ul
          v-if="searchResults || searchError"
          class="absolute w-full bg-secondary shadow-md py-2 px-1 top-[66px]"
        >
          <p v-if="searchError || searchResults.length === 0">
            Sorry, something wrong, please try again
          </p>
          <li
            v-else
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </ul>
      </div>
      <div><CityList /></div>
    </main>
    <template #fallback> loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getLocation } from "../apis";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const router = useRouter();

const TIME_WAIT_TO_SEARCH = 300;
const searchQuery = ref<string>("");
const searchTimer = ref<any>(null);
const searchResults = ref<any>(null);
const searchError = ref<boolean>(false);

const getSearchResult = () => {
  clearTimeout(searchTimer.value);

  searchTimer.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await getLocation(searchQuery.value);
        searchResults.value = result.features;
        return;
      } catch (error) {
        searchError.value = true;
      }
    }
    searchResults.value = null;
  }, TIME_WAIT_TO_SEARCH);
};

const previewCity = (searchResult: any) => {
  const { place_name, geometry } = searchResult;
  const [city, state] = place_name.split(",");
  router.push({
    name: "cityView",
    params: {
      state: state.replaceAll(" ", ""),
      city,
    },
    query: {
      lat: geometry.coordinates[1],
      lng: geometry.coordinates[0],
    },
  });
};
</script>

<style lang="scss" scoped></style>
