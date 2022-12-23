import { createContext, useContext, useEffect, useState } from "react";

import { permissions } from "../constants";
import rq from "../services/rq";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface AuthContextType {
  user: any;
  handleLogin: any;
  handleLogout: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCurator: boolean;
  isContributor: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: null,
  handleLogout: null,
  isLoading: false,
  isAuthenticated: false,
  isAdmin: false,
  isCurator: false,
  isContributor: false,
});

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = rq.useCurrentUser();

  // Reset user on successful logout
  const handleLogout = async () => {
    //setUser(null);
    queryClient.invalidateQueries([rq.keys.getCurrentUser]);
    await router.replace("/");
    toast.success("Logged out.", {
      id: "logout",
    });
  };

  // Set user on successful login
  const handleLogin = async (userData) => {
    //setUser(userData);
    queryClient.invalidateQueries([rq.keys.getCurrentUser]);
    if (router.query.next) {
      await router.push(router.query.next as string);
    } else {
      await router.push("/home");
    }
    toast.success(`Welcome ${userData.username}`, {
      id: "welcome",
    });
  };

  const isAuthenticated = !isLoading && data?.user;

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

  return (
    <AuthContext.Provider
      value={{
        user: data && data.user,
        handleLogin,
        handleLogout,
        isLoading,
        isAuthenticated,
        isAdmin,
        isCurator,
        isContributor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
