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
  console.log({ data });
  const initialValues = {
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
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

export const orderValues = (userData) => {
  const initialValues = {
    email: userData ? userData.email : "",
    phone: userData ? userData.phone : "",
    country: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postal_code: "",
  };
  return initialValues;
};
