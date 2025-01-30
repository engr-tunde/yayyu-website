"use client";

import { forgotPassword, resendVerificationOTP } from "@/api";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import { errorNotification, successNotification } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { forgotPasswordValues } from "@/lib/utils/initialValues";
import { validateForgotPassword } from "@/lib/utils/validate";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const initialValues = forgotPasswordValues();
  const validationSchema = validateForgotPassword();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await forgotPassword(values);
      console.log(response);
      if (response.status === 200) {
        const data = response.data;

        if (data.message === "Unverified email") {
          console.log(data.userId);
          errorNotification("Account not yet verified.");
          const otpRes = await resendVerificationOTP({ userId: data.userId });
          setTimeout(() => {
            if (otpRes.status === 200) {
              const otpData = response.data;
              successNotification(
                "OTP has been sent to your email address. Provide the OTP in the next screen"
              );
              setTimeout(
                () =>
                  router.push({
                    pathname: "/verify-account",
                    query: { userId: otpData.userId },
                  }),
                1500
              );
            } else {
              errorNotification(otpRes?.data?.error);
            }
          }, 1000);
        } else {
          successNotification(data.message);
        }
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <div className="h-full top-[100px]">
      <div className="container pt-40 pb-32">
        <div className="max-w-[650px] mx-auto flex flex-col items-center">
          <h1 className="mb-10 text-2xl lg:text-3xl font-semibold">
            Forgot account password
          </h1>
          <div className="w-full">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Account Email</label>
                <InputField
                  name="email"
                  placeholder="Enter account email"
                  full={true}
                />
              </div>

              <div className="flex justify-between mt-10 mb-7 items-center gap-5">
                <div className="text-sm items-center font-medium">
                  Remembered your password?
                </div>

                <Link href="/login" className="font-semibold">
                  Login Instead
                </Link>
              </div>

              <SubmitButton
                title="Send password reset link"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
