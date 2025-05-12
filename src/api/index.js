/* eslint-disable react-hooks/rules-of-hooks */

import { mutationRequest } from "./sendData";
import { fetcher, sessionFetcher } from "./fetcher";
import useSWR from "swr";

// AUth

export const userRegister = async (values) => {
  const result = await mutationRequest("/user-auth/signup", "post", values);
  return result;
};
export const userLogin = async (values) => {
  const result = await mutationRequest("/user-auth/login", "post", values);
  return result;
};
export const resendVerificationOTP = async (userId) => {
  const result = await mutationRequest(
    "/user-auth/resend-verification-otp",
    "post",
    { userId }
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
    { password }
  );
  return result;
};

// General
export const fetchProducts = () => {
  const { data, error, mutate } = useSWR("/general/all-products", fetcher);
  console.log("data", data);
  return {
    products: data?.data,
    productsLoading: !error && !data,
    productsError: error,
    mutateProducts: mutate,
  };
};
export const fetchProductCategories = () => {
  const { data, error, mutate } = useSWR("/general/all-categories", fetcher);
  return {
    categories: data?.data,
    categoriesLoading: !error && !data,
    categoriesError: error,
    mutateCategories: mutate,
  };
};
export const fetchSingleProduct = (item_slug) => {
  const { data, error, mutate } = useSWR(
    `/general/single-product-slug/${item_slug}`,
    fetcher
  );
  // console.log("data", data?.data);
  return {
    product: data?.data,
    productLoading: !error && !data,
    productError: error,
    mutateProducts: mutate,
  };
};
export const fetchProductReviews = (owner) => {
  const { data, error, mutate } = useSWR(
    `/general/all-product-reviews/${owner}`,
    fetcher
  );
  return {
    reviews: data?.data,
    reviewsLoading: !error && !data,
    reviewsError: error,
    mutateReviews: mutate,
  };
};
export const fetchShippingData = () => {
  const { data, error, mutate } = useSWR("/general/all-shipping-data", fetcher);
  return {
    shippingData: data?.data,
    shippingDataLoading: !error && !data,
    shippingDataError: error,
    mutateShippingData: mutate,
  };
};
export const fetchDiscountData = () => {
  const { data, error, mutate } = useSWR("/general/general-discount", fetcher);
  return {
    discountData: data?.data,
    discountDataLoading: !error && !data,
    discountDataError: error,
    mutatediscountData: mutate,
  };
};

export const fetchUserDataIfAvailable = () => {
  const { data, error, mutate } = useSWR("/user-profile/user", fetcher);
  return {
    user: data?.data,
    userLoading: !error && !data,
    userError: error,
    mutateUser: mutate,
  };
};
export const makeOrder = async (values) => {
  const result = await mutationRequest("/general/make-order", "post", values);
  return result;
};

// Dashboard
export const fetchUser = () => {
  const { data, error, mutate } = useSWR("/user-profile/user", sessionFetcher);
  return {
    user: data?.data,
    userLoading: !error && !data,
    userError: error,
    mutateUser: mutate,
  };
};
export const fetchUserOrders = () => {
  const { data, error, mutate } = useSWR(
    "/user-profile/orders",
    sessionFetcher
  );
  return {
    orders: data?.data,
    ordersLoading: !error && !data,
    ordersError: error,
    mutateOrders: mutate,
  };
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
