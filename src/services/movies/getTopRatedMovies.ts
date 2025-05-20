import api from "../api";

export const getTopRatedMovies = async (page: number) => {
  let res: any;
  const endpoint = `/movie/top_rated?language=en-US&page=${page}`;
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
