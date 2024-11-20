"use client";

import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import PageHeader from "@/components/globals/PageHeader";
import CustomFormik from "@/lib/utils/CustomFormik";

const page = () => {
  const initialValues = {};
  const validationSchema = {};

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="h-full top-[100px]">
      <PageHeader title="Contact Us" />
      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="">Name</label>
                <InputField name="name" placeholder="Name" full={true} />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="">Email</label>
                <InputField name="email" placeholder="Email" full={true} />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="">Enquiry</label>
                <textarea
                  name=""
                  id=""
                  className="col-span-2 border rounded-md w-[100%] bg-transparent p-3 text-[14px] font-[400] h-[150px]"
                ></textarea>
              </div>
              <SubmitButton
                title="Send"
                className="mt-6 w-full submit-btn py-4"
              />
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
