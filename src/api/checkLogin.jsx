import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { errorNotification, successNotification } from "@/lib/helpers";
axios.defaults.withCredentials = true;

const checkLogin = () => {
  const router = useRouter();
  useEffect(() => {
    const check = async () => {
      const response = await axios.get(
        `${process.env.API_ENDPOINT}/user-auth/check-session`,
        {
          withCredentials: true,
        }
      );
      try {
        if (response.status === 200) {
          successNotification(
            "You are already a logged in user. You'll be redirected in a few seconds."
          );
          setTimeout(() => router.push("/dashboard"), 1000);
        }
      } catch (error) {
        errorNotification(error?.response?.data?.error);
      }
    };
    check();
  }, []);
};

export default checkLogin;
