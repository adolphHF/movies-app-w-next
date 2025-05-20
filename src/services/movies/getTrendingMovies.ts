import api from "../api";

export const getTrendingMovies = async () => {
  try {
    const { data } = await api.get("/movie/popular");
    return data.results;
  } catch (error) {
    throw error;
  }
};
