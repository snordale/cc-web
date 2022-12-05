import { getCookie } from "cookies-next";
import { permissions } from "../constants";
import { useCurrentUser } from "../services/query";

export const useUser = () => {
  console.log("use user");
  const query = useCurrentUser();

  const tokenInCookies = getCookie("token");

  const isLoggedIn = !!tokenInCookies;

  const isUserLoaded = query.data && query.data.user;

  const isCurator = isUserLoaded
    ? query.data.user.permission === permissions.god ||
      query.data.user.permission === permissions.admin
    : undefined;

  const isMember = isUserLoaded
    ? query.data.user.permission === permissions.tier1 ||
      query.data.user.permission === permissions.tier2
    : undefined;

  const isAdmin = isUserLoaded
    ? query.data.user.permission === permissions.curator
    : undefined;

  return {
    ...query,
    isLoggedIn,
    isUserLoaded,
    isCurator,
    isAdmin,
    isMember,
  };
};
