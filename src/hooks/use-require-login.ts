import router from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useUser } from "./use-user";

export const useRequireLogin = () => {
  const { isLoggedIn, data } = useUser();

  console.log("data");
  console.log(data);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Not logged in.", { id: "Not logged in." });
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [isLoggedIn]);
};
