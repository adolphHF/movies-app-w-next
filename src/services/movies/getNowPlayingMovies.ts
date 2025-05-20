import api from "../api";

export const getNowPlayingMovies = async () => {
  let res: unknown;
  const endpoint = "/movie/now_playing?language=en-US";
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
