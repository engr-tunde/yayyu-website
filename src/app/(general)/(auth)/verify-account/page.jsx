"use client";

import { resendVerificationOTP, verifyAccountEmail } from "@/api";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import { errorNotification, successNotification } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { otpValues } from "@/lib/utils/initialValues";
import { validateOtp } from "@/lib/utils/validate";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyAccountPage = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const initialValues = otpValues();
  const validationSchema = validateOtp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  console.log({ userId });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  const resendOTP = async () => {
    const response = await resendVerificationOTP(userId);
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = {
      otp: values.otp,
      userId,
    };

    const response = await verifyAccountEmail(payload);
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => router.push("/dashboard"), 3000);
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
            Verify your acccount
          </h1>
          <div className="w-full">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">OTP</label>
                <InputField name="otp" placeholder="Enter OTP" full={true} />
              </div>

              <div className="flex justify-between mt-10 mb-7 items-center gap-5">
                <div className="text-sm items-center font-medium">
                  Didn&apos;t receive the OTP?
                </div>

                {seconds < 1 ? (
                  <div
                    className="font-semibold cursor-pointer"
                    onClick={resendOTP}
                  >
                    Resend OTP
                  </div>
                ) : (
                  <div className="font-medium">
                    Resending in {minutes} {seconds}...
                  </div>
                )}
              </div>

              <SubmitButton
                title="Verify account"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
