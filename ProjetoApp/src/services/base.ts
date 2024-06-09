import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface IResponse<T = never> {
  data: T;
  message: string;
  success: boolean;
}
const http = axios.create({
  baseURL: "https://db89d47v-7062.brs.devtunnels.ms",
  validateStatus() {
    return true;
  },
});

http.interceptors.request.use(
  async function (config) {
    if (config.headers != null && config.headers["Authorization"] == null)
      config.headers["Authorization"] =
        "Bearer " + await AsyncStorage.getItem("TOKEN");

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { http };
