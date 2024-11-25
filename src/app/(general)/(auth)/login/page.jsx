"use client";

import { resendVerificationOTP, userLogin } from "@/api";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import { errorNotification, successNotification } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { loginValues } from "@/lib/utils/initialValues";
import { validateLogin } from "@/lib/utils/validate";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const initialValues = loginValues();
  const validationSchema = validateLogin();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("values", values);
    router.push("/orders");
    // const response = await userLogin(values);
    // console.log(response);
    // try {
    //   if (response.status === 200) {
    //     const data = response.data;
    //     if (data.message === "Unverified email") {
    //       console.log(data.userId);
    //       errorNotification("Account not yet verified.");
    //       const otpRes = await resendVerificationOTP({ userId: data.userId });
    //       setTimeout(() => {
    //         if (otpRes.status === 200) {
    //           const otpData = response.data;
    //           successNotification(
    //             "OTP has been sent to your email address. Provide the OTP in the next screen"
    //           );
    //           setTimeout(
    //             () =>
    //               router.push({
    //                 pathname: "/verify-account",
    //                 query: { userId: otpData.userId },
    //               }),
    //             2000
    //           );
    //         } else {
    //           errorNotification(otpRes?.data?.error);
    //         }
    //       }, 1000);
    //     } else {
    //       successNotification(data.message);
    //       setTimeout(() => router.push("/dashboard"), 1500);
    //     }
    //   } else {
    //     errorNotification(response?.data?.error);
    //   }
    // } catch (error) {
    //   errorNotification(error?.response?.data?.error);
    // }
  };

  return (
    <div className="h-full top-[100px]">
      <div className="container pt-40 pb-32">
        <div className="max-w-[650px] mx-auto flex flex-col items-center">
          <h1 className="mb-10 text-2xl lg:text-3xl font-semibold">
            Login to your acccount
          </h1>
          <div className="w-full">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Email</label>
                <InputField name="email" placeholder="Email" full={true} />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Password</label>
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                  full={true}
                />
              </div>

              <div className="flex justify-between mb-5 items-center gap-5">
                <div className="text-xs items-center">
                  By clicking Log in, you agree to our{" "}
                  <Link
                    href="/return-policy"
                    className="font-semibold underline"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
                <Link
                  href="/forgot-password"
                  className="font-semibold min-w-max"
                >
                  Forgot password
                </Link>
              </div>

              <SubmitButton
                title="Send"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />

              <div className="flex justify-center items-center gap-2">
                <div className="text-sm items-center">
                  Don&apos;t have an account yet?
                </div>
                <Link href="/register" className="font-semibold text-lg">
                  Signup instead
                </Link>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
