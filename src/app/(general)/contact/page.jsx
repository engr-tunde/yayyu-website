"use client";

import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import PageHeader from "@/components/globals/PageHeader";
import CustomFormik from "@/lib/utils/CustomFormik";
import Link from "next/link";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
          <div className="col-span-1 flex flex-col gap-2 justify-center">
            <div className="text-sm lg:mt-6 mb-3">
              If you have inquiries or need assistance, do not hesitate to chat
              with us. We are available Monday to Sunday (8am to 7pm). Public
              Holidays between 9am and 5pm.
            </div>
            <div className="">
              Address:{" "}
              <span className="font-medium">{process.env.APP_ADDRESS}</span>
            </div>
            <div className="">
              Phone number:{" "}
              <Link
                href={`tel:${process.env.APP_PHONE}`}
                className="font-medium"
              >
                {process.env.APP_PHONE}
              </Link>
            </div>
            <div className="">
              Email address:{" "}
              <Link
                href={`Address::${process.env.APP_EMAIL}`}
                className="font-medium"
              >
                {process.env.APP_EMAIL}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
