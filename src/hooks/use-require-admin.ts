import { permissions } from "../constants";
import router from "next/router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useUser } from "./use-user";

export const useRequireAdmin = () => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace(`/login?next=${router.pathname}`).then(() => {
          toast.error("Not logged in.", { id: "error" });
        });
      } else if (
        ![permissions.admin, permissions.god].includes(user.permission)
      ) {
        router.replace("/home").then(() => {
          toast.error("Not an admin.", { id: "error" });
        });
      }
    }
  }, [user]);
};
