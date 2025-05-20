import api from "../api";

export const getTrendingPeople = async () => {
  try {
    const { data } = await api.get("/trending/person/day");
    return data.results;
  } catch (error) {
    throw error;
  }
};
