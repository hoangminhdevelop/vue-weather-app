import { inject } from "vue";

export const { savedCities, saveCity } = inject(SAVED_CITY_PROVIDE_KEY) as any;
