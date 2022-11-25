import { JoinRequestArgs, LoginRequestArgs } from "../types/services/cc";

import { apiRoot } from "../config";

const request = (endpoint: string, config: RequestInit) => {
  const url = `${apiRoot}${endpoint}`;
  const configHeaders = config.headers;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    ),
  };

  return fetch(url, {
    ...config,
    credentials: "include",
    mode: "cors",
    headers: {
      ...defaultHeaders,
      ...configHeaders,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const join = ({ email, username, password, token }: JoinRequestArgs) => {
  return request("/auth/join", {
    method: "post",
    body: JSON.stringify({ email, username, password, token }),
  });
};

export const login = ({
  usernameOrEmail,
  password,
}: LoginRequestArgs): Promise<{ user?: any; errors?: any }> => {
  return request("/auth/login", {
    method: "post",
    body: JSON.stringify({ usernameOrEmail, password }),
  });
};

export const logout = (): Promise<{ success: boolean }> => {
  return request("/auth/logout", { method: "post" });
};

export const getCurrentUser = (): Promise<{ user: any }> => {
  console.log("call user");
  return request("/users/current", {
    method: "get",
  });
};

export const getBasicAuthLink = (): Promise<{ link: string }> => {
  return request("/spotify/basic-auth-link", {
    method: "get",
  });
};

export const getCuratorAuthLink = (): Promise<{ link: string }> => {
  return request("/spotify/curator-auth-link", {
    method: "get",
  });
};

export const getUsersTopTracks = (userId: string): Promise<{ tracks: any }> => {
  return request(`/spotify/users-top-tracks?userId=${userId}`, {
    method: "get",
  });
};

export const cc = {
  join,
  login,
  logout,
  getCurrentUser,
  getBasicAuthLink,
  getCuratorAuthLink,
  getUsersTopTracks,
};
