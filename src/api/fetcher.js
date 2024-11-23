import { axiosInstance } from './client';

export const fetcher = (url) =>
  axiosInstance()
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });

export const sessionFetcher = (url) =>
  axiosInstance()
    .get(url, { withCredentials: true })
    .then((res) => {
      if (res.status !== 404) {
        window.location.href = '/';
      }
    })
    .catch((err) => {
      throw Error(err);
    });
