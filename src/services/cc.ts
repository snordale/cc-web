import { JoinRequestArgs, LoginRequestArgs } from "../types/services/cc";

import { apiRoot } from "../config";

const request = (endpoint: string, config: RequestInit) => {
  const url = `${apiRoot}${endpoint}`;
  const configHeaders = config.headers;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
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

export const joinWaitlist = ({ email }: { email: string }) => {
  return request("/auth/join-waitlist", {
    method: "post",
    body: JSON.stringify({ email }),
  });
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

export const getUsers = (): Promise<{ users: any }> => {
  return request("/users", {
    method: "get",
  });
};

export const getCurrentUser = (): Promise<{ user: any }> => {
  return request("/users/current", {
    method: "get",
  });
};

export const setUserPermission = (
  userId: string
): Promise<{ success: boolean; error: string }> => {
  return request(`/users/${userId}`, {
    method: "put",
  });
};

export const createCuratorToken = (): Promise<{ token: string }> => {
  return request("/auth/create-curator-token", {
    method: "post",
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

export type SetPermissionsBody = {
  userIds: string[];
  permission: string;
};

export const setPermissions = (
  body: SetPermissionsBody
): Promise<{ success: string }> => {
  return request("/users/set-permissions", {
    method: "post",
    body: JSON.stringify(body),
  });
};

type ExchangeAuthCodeBody = {
  code: string;
  stateToken: string;
};

export const exchangeAuthCode = (
  body: ExchangeAuthCodeBody
): Promise<{
  success?: boolean;
  error?: string;
}> => {
  return request("/spotify/exchange-auth-code", {
    method: "post",
    body: JSON.stringify(body),
  });
};

export const getUsersTopTracks = (userId: string): Promise<{ tracks: any }> => {
  return request(`/spotify/users-top-tracks?userId=${userId}`, {
    method: "get",
  });
};

export const getPlaylists = (): Promise<{ playlists: any }> => {
  return request("/playlists", {
    method: "get",
  });
};

export const cc = {
  joinWaitlist,
  join,
  login,
  logout,
  createCuratorToken,
  getUsers,
  getPlaylists,
  getCurrentUser,
  getBasicAuthLink,
  getCuratorAuthLink,
  getUsersTopTracks,
  exchangeAuthCode,
  setUserPermission,
  setPermissions,
};
