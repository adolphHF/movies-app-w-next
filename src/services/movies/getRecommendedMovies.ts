import api from "../api";
export const getRecommendedMovies = async (id: string) => {
  try {
    const { data } = await api.get(`/movie/${id}/recommendations`);
    console.log("this is the obtained data", data);
    return data;
  } catch (error) {
    throw error;
  }
};
