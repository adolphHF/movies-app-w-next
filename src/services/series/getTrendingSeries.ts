import api from "../api";

export const getTrendingSeries = async () => {
  try {
    const { data } = await api.get("/trending/tv/day");
    return data.results;
  } catch (error) {
    throw error;
  }
};
