"use client";

import { resetPassword } from "@/api";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import { errorNotification, successNotification } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { resetPasswordValues } from "@/lib/utils/initialValues";
import { validateResetPassword } from "@/lib/utils/validate";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const initialValues = resetPasswordValues();
  const validationSchema = validateResetPassword();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await resetPassword({
        id,
        token,
        password: values.password,
      });
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        router.push("/login");
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
          <h1 className="mb-10 text-2xl lg:text-2xl font-semibold">
            Reset account password
          </h1>
          <div className="w-full">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">New password</label>
                <InputField
                  name="password"
                  placeholder="Enter new password"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Confirm New password</label>
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  full={true}
                />
              </div>

              <SubmitButton
                title="Reset password"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
