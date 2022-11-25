import { permissions } from "../constants";
import { useCurrentUser } from "../services/query";

export const useUser = () => {
  console.log("use user");
  const query = useCurrentUser();

  const loggedIn = !query.isLoading && query.data && query.data.user;

  const isCurator = loggedIn
    ? query.data?.user.permission === permissions.GOD ||
      query.data?.user.permission === permissions.ADMIN
    : undefined;

  const isMember = loggedIn
    ? query.data?.user.permission === permissions.TIER1 ||
      query.data?.user.permission === permissions.TIER2
    : undefined;

  const isAdmin = loggedIn
    ? query.data?.user.permission === permissions.CURATOR
    : undefined;

  return {
    ...query,
    isCurator,
    isAdmin,
    isMember,
  };
};
