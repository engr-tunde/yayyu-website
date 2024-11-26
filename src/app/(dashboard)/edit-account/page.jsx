"use client";

import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import CustomFormik from "@/lib/utils/CustomFormik";
import { updateProfileValues } from "@/lib/utils/initialValues";
import { validateUpdateProfile } from "@/lib/utils/validate";
import { useRouter } from "next/navigation";

const EditAccountPage = () => {
  const data = {
    first_name: "Tee",
    last_name: "King",
    email: "devteeking@gmail.com",
  };
  const initialValues = updateProfileValues(data);
  const validationSchema = validateUpdateProfile();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("values", values);
    router.push("/orders");
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
              <InputField name="email" placeholder="Email" full={true} />
            </div>

            <SubmitButton
              title="Save changes"
              className="mt-4 mb-6 w-full submit-btn py-4"
            />
          </CustomFormik>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;
