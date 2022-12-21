import { permissions } from "../constants";
import { useCurrentUser } from "../services/rq";

export const useUser = () => {
  const query = useCurrentUser();

  const isUserLoaded = query.data && !!query.data.user;
  const isLoggedIn = isUserLoaded;

  const isCurator = isUserLoaded
    ? query.data?.user.permission === permissions.curator
    : undefined;

  const isContributor = isUserLoaded
    ? query.data?.user.permission !== permissions.none
    : undefined;

  const isAdmin = isUserLoaded
    ? query.data?.user.permission === permissions.admin ||
      query.data?.user.permission === permissions.god
    : undefined;

  return {
    ...query,
    isLoggedIn,
    isUserLoaded,
    isCurator,
    isAdmin,
    isContributor,
  };
};
