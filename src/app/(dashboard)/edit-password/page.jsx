"use client";

import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import CustomFormik from "@/lib/utils/CustomFormik";
import { editPaswordValues } from "@/lib/utils/initialValues";
import { validateUpdatePassword } from "@/lib/utils/validate";
import { useRouter } from "next/navigation";
import axios from "axios";
import { errorNotification, successNotification } from "@/lib/helpers";
axios.defaults.withCredentials = true;

const EditPasswordPage = () => {
  const initialValues = editPaswordValues();
  const validationSchema = validateUpdatePassword();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("values", values);
    const response = await axios.put(
      `${process.env.API_ENDPOINT}/user-profile/update-password`,
      values
    );
    console.log(response);
    try {
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(() => router.push("/dashboard"), 500);
      } else {
        errorNotification(response?.data?.error);
      }
    } catch (error) {
      errorNotification(error?.response?.data?.error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center py-6 overflow-y-scroll">
      <div className="w-full lg:w-[450px] mx-auto flex flex-col items-center">
        <div className="w-full px-5 lg:px-0">
          <CustomFormik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-1 mb-5">
              <label className="font-medium col-span-2">Current Password</label>
              <InputField
                name="oldPassword"
                placeholder="Current Password"
                full={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-1 mb-5">
              <label className="font-medium col-span-2">New Password</label>
              <InputField
                name="newPassword"
                placeholder="New Password"
                full={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-1 mb-5">
              <label className="font-medium col-span-2">
                Confirm New Password
              </label>
              <InputField
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                full={true}
              />
            </div>

            <SubmitButton
              title="Update password"
              className="mt-4 mb-6 w-full submit-btn py-4"
            />
          </CustomFormik>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordPage;
