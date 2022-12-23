import router from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useUser } from "./use-user";

export const useRequireLogin = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      toast.error("Not logged in.", { id: "Not logged in." });
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [user, isLoading]);
};
