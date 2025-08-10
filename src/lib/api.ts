import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.pokemontcg.io/v2" });

api.interceptors.request.use((config) => {
  const key = process.env.NEXT_PUBLIC_POKEMON_TCG_API_KEY;
  if (key) config.headers["X-Api-Key"] = key;
  return config;
});

export default api;