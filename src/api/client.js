import axios from 'axios';

export const axiosInstance = () =>
  axios.create({
    baseURL: process.env.API_ENDPOINT,
  });

// axiosInstance().interceptors.response.use((res) => {
//   if (res.status === 404) {
//     window.location.href = '/dashboard/login';
//   }
// });
