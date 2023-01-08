import { createContext } from "react";
import { permissions } from "../constants";
import rq from "../services/rq";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCurator: boolean;
  isContributor: boolean;
  isNotUser: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isAdmin: false,
  isCurator: false,
  isContributor: false,
  isNotUser: true,
});

export const useUser = () => {
  console.log("use user");
  const { data, isLoading } = rq.useCurrentUser();
  console.log(isLoading);
  console.log(data);

  const isAuthenticated = !isLoading && !!data?.user;
  const isNotUser = !isLoading && !data?.user;

  const isCurator = isAuthenticated
    ? data?.user.permission === permissions.curator
    : false;

  const isContributor = isAuthenticated
    ? data?.user.permission !== permissions.none
    : false;

  const isAdmin = isAuthenticated
    ? data?.user.permission === permissions.admin ||
      data?.user.permission === permissions.god
    : false;

  return {
    user: data && data.user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isCurator,
    isContributor,
    isNotUser,
  };
};
