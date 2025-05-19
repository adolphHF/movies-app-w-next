import Config from "@/config";
import axios from "axios";

//Create axios instance
const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
});

//Request interceptor
api.interceptors.request.use(
  (config) => {
    const newCOnfig = { ...config };
    newCOnfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
    console.log("making request to: ", newCOnfig);
    return newCOnfig;
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

//Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error: ", error);
    return Promise.reject(error);
  }
);

export default api;

//ESTO SE SUELE HACER UNA SOLA VEZ Y NO SUELE CAMBIAR MUCHO
