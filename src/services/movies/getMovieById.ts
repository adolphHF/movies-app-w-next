import api from "../api";
export const getMovieById = async (id: string) => {
  try {
    const { data } = await api.get(`/movie/${id}`);
    console.log("this is the obtained data", data); //TODO clean this log
    return data;
  } catch (error) {
    throw error;
  }
};
