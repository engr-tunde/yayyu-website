import * as yup from "yup";
import { z } from "zod";

export const validateLogin = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Account email is missing"),
    password: yup.string().trim().required("Account password is missing"),
  });
  return validationSchema;
};

export const validateSignup = () => {
  // const phoneRegExp = /^+?[0-9]{6,15}$/;
  const phoneRegExp = /^[\d|\+|\(]+[\)|\d|\s|-]*[\d]$/;
  const validationSchema = yup.object({
    first_name: yup.string().trim().required("First name is missing"),
    last_name: yup.string().trim().required("Last name is missing"),
    email: yup.string().email("Invalid email").required("Email is missing"),
    password: yup
      .string()
      .trim()
      .min(8, "Password is too short")
      .required("Password is missing"),
    confirmPassword: yup
      .string()
      .required("Confirm Account Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return validationSchema;
};

export const validateUpdateProfile = () => {
  const validationSchema = yup.object({
    first_name: yup.string().trim().required("First name is missing"),
    last_name: yup.string().trim().required("Last name is missing"),
    email: yup.string().email("Invalid email").required("Email is missing"),
  });
  return validationSchema;
};

export const validateUpdatePassword = () => {
  const validationSchema = yup.object({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: yup
      .string()
      .required("Account Password is required")
      .min(8, "Password is too short"),
    confirmNewPassword: yup
      .string()
      .required("Confirm Account Password")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });
  return validationSchema;
};

export const validateForgotPassword = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Account email is missing"),
  });
  return validationSchema;
};

export const validateResetPassword = () => {
  const validationSchema = yup.object({
    password: yup
      .string()
      .trim()
      .min(8, "Password is too short")
      .required("Password is missing"),
    confirmPassword: yup
      .string()
      .required("Confirm Account Password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return validationSchema;
};

export const validateOtp = () => {
  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .trim()
      .min(4, "OTP is incomplete")
      .max(5, "OTP digits cannot be more than 4 characters long")
      .required("Please provide the OTP"),
  });
  return validationSchema;
};

export const validateMakeOrder = (country, state) =>
  z.object({
    email: z.string().email({ message: "Invalid email adress" }),
    phone: z.coerce.number().min(1, { message: "Phone number is missing!" }),
    country: z.enum(country, { message: "In which country are you located?" }),
    first_name: z.string().min(1, { message: "First name is missing!" }),
    last_name: z.string().min(1, { message: "Last name is missing!" }),
    address: z.string().min(1, { message: "Delivery address is missing!" }),
    apartment: z.string().optional(),
    city: z.string().min(1, { message: "Delivery city is missing!" }),
    state: z.enum(state, { message: "Delivery state is missing!" }),
    postal_code: z.string().optional(),
  });
