import api from "../api";

export const getPopularMovies = async (page: number) => {
  let res: any;
  const endpoint = `/movie/popular?language=en-US&page=${page}`;
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data;
    })
    .catch((error) => {
      res = error.response;
    });

  return res;
};
