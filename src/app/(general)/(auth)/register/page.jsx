"use client";

import { userRegister } from "@/api";
import useCheckLogin from "@/api/useCheckLogin";
import InputField from "@/components/globals/form/InputField";
import SubmitButton from "@/components/globals/form/SubmitButton";
import useRouter from "@/hooks/useRouter";
import { errorNotification, successNotification } from "@/lib/helpers";
import CustomFormik from "@/lib/utils/CustomFormik";
import { signUpValues } from "@/lib/utils/initialValues";
import { validateSignup } from "@/lib/utils/validate";
import Link from "next/link";

const RegisterPage = () => {
  useCheckLogin();
  const initialValues = signUpValues();
  const validationSchema = validateSignup();
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      const response = await userRegister(values);
      if (response.status === 200) {
        const data = response.data;
        successNotification(data.message);
        setTimeout(
          () =>
            router.push({
              pathname: "/verify-account",
              query: { userId: data.userId },
            }),
          3000
        );
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
            Create an acccount
          </h1>
          <div className="w-full">
            <CustomFormik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">First name</label>
                <InputField
                  name="first_name"
                  placeholder="First name"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Last name</label>
                <InputField
                  name="last_name"
                  placeholder="Last name"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Email</label>
                <InputField name="email" placeholder="Email" full={true} />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Your password</label>
                <InputField
                  name="password"
                  placeholder="Password"
                  type="password"
                  full={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-1 mb-5">
                <label className="font-medium">Confirm password</label>
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  full={true}
                />
              </div>

              <div className="flex justify-between mb-5 items-center gap-5">
                <div className="text-xs items-center">
                  By clicking Sign up, you agree to our{" "}
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
              </div>

              <SubmitButton
                title="Sign Up"
                className="mt-4 mb-6 w-full submit-btn py-4"
              />

              <div className="flex justify-center items-center gap-2">
                <div className="text-sm items-center">
                  Already have an account?
                </div>
                <Link href="/login" className="font-semibold text-lg">
                  Login instead
                </Link>
              </div>
            </CustomFormik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
