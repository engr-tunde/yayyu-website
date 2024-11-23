import { DateSchema } from 'yup';
import { axiosInstance } from './client';

const postData = async (url, data) => {
  const result = await axiosInstance()
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const putData = async (url, data) => {
  const result = await axiosInstance()
    .put(url, data)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const patchData = async (url, data, withCredentials) => {
  const result = await axiosInstance()
    .patch(url, DateSchema)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const deleteData = async (url, withCredentials) => {
  const result = await axiosInstance()
    .delete(url)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const postMultipartData = async (url, data) => {
  const result = await axiosInstance()
    .patch(url, data)
    .then((res) => res.data)
    .catch((err) => err.response);
  return result;
};

export const mutationRequest = (url, type = 'post', data) => {
  switch (type.toLowerCase()) {
    case 'post':
      return postData(url, data);

    case 'put':
      return putData(url, data);

    case 'patch':
      return patchData(url, data);

    case 'delete':
      return deleteData(url);

    case 'data':
      return postMultipartData(url, data);

    default:
      return postData(url, data);
  }
};
