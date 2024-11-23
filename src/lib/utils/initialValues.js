export const loginValues = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return initialValues;
};

export const signUpValues = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return initialValues;
};

export const updateProfileValues = (data) => {
  const initialValues = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    country: data.country,
  };
  return initialValues;
};

export const editPaswordValues = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  return initialValues;
};

export const forgotPasswordValues = () => {
  const initialValues = {
    email: "",
  };
  return initialValues;
};

export const resetPasswordValues = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  return initialValues;
};

export const otpValues = () => {
  const initialValues = {
    otp: "",
  };
  return initialValues;
};
