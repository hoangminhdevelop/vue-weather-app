import axios from "axios";

const MAP_BOX_TOKEN = import.meta.env.VITE_MAP_BOX_TOKEN;

export const getLocation = async (search_text: string) => {
  const result = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=${MAP_BOX_TOKEN}&types=place`
  );
  return result.data;
};
