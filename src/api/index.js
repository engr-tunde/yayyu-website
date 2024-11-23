/* eslint-disable react-hooks/rules-of-hooks */

import { mutationRequest } from "./sendData";
import { fetcher } from "./fetcher";
import useSWR from "swr";

export const userRegister = async (values) => {
  const result = await mutationRequest("/user-auth/register", "post", values);
  return result;
};

export const userLogin = async (values) => {
  const result = await mutationRequest("/user-auth/login", "post", values);
  return result;
};
export const resendVerificationOTP = async (values) => {
  const result = await mutationRequest(
    "/user-auth/resend-verification-otp",
    "post",
    values
  );
  return result;
};
export const verifyAccountEmail = async (values) => {
  const result = await mutationRequest(
    "/user-auth/verify-email",
    "post",
    values
  );
  return result;
};
export const forgotPassword = async (values) => {
  const result = await mutationRequest(
    "/user-auth/forgot-password",
    "post",
    values
  );
  return result;
};
export const resetPassword = async ({ id, token, password }) => {
  const result = await mutationRequest(
    `/user-auth/reset-password?id=${id}&token=${token}`,
    "post",
    password
  );
  return result;
};

export const donate = async (values) => {
  const result = await mutationRequest("/website/donate", "post", values);
  return result;
};
export const contact = async (values) => {
  const result = await mutationRequest("/website/contact", "post", values);
  return result;
};
export const requestQuote = async (values) => {
  const result = await mutationRequest(
    "/website/request-quote",
    "post",
    values
  );
  return result;
};
export const fetchGallery = () => {
  const { data, error, mutate } = useSWR("/website/gallery", fetcher);
  return {
    posts: data?.posts,
    postsLoading: !error && !data,
    postsError: error,
    mutatePosts: mutate,
  };
};
