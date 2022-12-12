import router from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useUser } from "./use-user";

export const useRequireLogin = () => {
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Not logged in.", { id: "Not logged in." });
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [isLoggedIn]);
};
