import api from "../api";

export const getNowPlayingMovies = async (page: number) => {
  let res: any;
  const endpoint = `/movie/now_playing?language=en-US&page=${page}`;
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
