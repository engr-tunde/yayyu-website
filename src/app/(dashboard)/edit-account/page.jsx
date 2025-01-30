"use client";

import { fetchUser } from "@/api";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import CustomFormik from "@/lib/utils/CustomFormik";
import { updateProfileValues } from "@/lib/utils/initialValues";
import { validateUpdateProfile } from "@/lib/utils/validate";
import { useRouter } from "next/navigation";
import axios from "axios";
import { errorNotification, successNotification } from "@/lib/helpers";
import Loader from "@/components/globals/Loader";
axios.defaults.withCredentials = true;

const EditAccountPage = () => {
  const { user, userLoading, userError } = fetchUser();
  console.log({ user });
  const initialValues = updateProfileValues(user);
  const validationSchema = validateUpdateProfile();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("values", values);
    const response = await axios.put(
      `${process.env.API_ENDPOINT}/user-profile/update-profile`,
      values
    );
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

  return (
    <div className="w-full h-full flex flex-col justify-center py-6 overflow-y-scroll">
      <div className="w-full lg:w-[450px] mx-auto flex flex-col items-center">
        {user && (
          <div className="w-full px-5 lg:px-0">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium col-span-2">First Name</label>
                <InputField
                  name="first_name"
                  placeholder="First Name"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium col-span-2">Last Name</label>
                <InputField
                  name="last_name"
                  placeholder="Last Name"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium col-span-2">Email</label>
                <InputField
                  name="email"
                  placeholder="Email"
                  full={true}
                  disabled
                />
              </div>

              <SubmitButton
                title="Save changes"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />
            </CustomFormik>
          </div>
        )}
        {userLoading && <Loader />}
        {userError && <div className="font-semibold">{userError}</div>}
      </div>
    </div>
  );
};

export default EditAccountPage;
