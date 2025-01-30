import * as yup from "yup";

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

export const validateMakeOrder = () => {
  const phoneRegExp = /^[\d|\+|\(]+[\)|\d|\s|-]*[\d]$/;
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is missing"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number provided")
      .required("Phone number is missing"),
    country: yup.string().trim().required("In which country are you located?"),
    first_name: yup.string().trim().required("First name is missing!"),
    last_name: yup.string().trim().required("Last name is missing!"),
    address: yup.string().trim().required("Delivery address is missing!"),
    city: yup.string().trim().required("Delivery city is missing!"),
    state: yup.string().trim().required("Delivery state is missing!"),
  });
  return validationSchema;
};
