import { useRouter as useNextRouter } from "next/navigation";

const useRouter = () => {
  const { push: nextPush, ...rest } = useNextRouter();

  const customPush = ({ pathname, query }) => {
    const generateQuery = new URLSearchParams(query).toString();

    nextPush(`${pathname}?${generateQuery}`);
  };

  return { ...rest, push: customPush };
};

export default useRouter;
