import { axiosInstance } from "./client";

export const fetcher = (url) =>
  axiosInstance()
    .get(url)
    .then((res) => {
      // console.log("res", res);
      if (res.status !== 200) {
        let error = res.data.error;
        throw error.toString();
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      let error;
      if (typeof err === "string") {
        error = err;
      } else {
        error = err.message;
      }
      console.log("error", error);
      throw error;
    });

export const sessionFetcher = (url) =>
  axiosInstance()
    .get(url, { withCredentials: true })
    .then((res) => {
      if (res.status === 209) {
        window.location.href = "/login";
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      throw Error(err);
    });
