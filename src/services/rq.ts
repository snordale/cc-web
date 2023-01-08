import { SetPermissionsBody, cc } from "./cc";
import { useMutation, useQuery } from "@tanstack/react-query";

export const keys = {
  getUsers: "getUsers",
  getCurrentUser: "getCurrentUser",
  getTopTracks: "getTopTracks",
  getPlaylists: "getPlaylists",
};

/*
	Queries
*/

export function useUsers() {
  return useQuery({
    queryKey: [keys.getUsers],
    queryFn: cc.getUsers,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: [keys.getCurrentUser],
    queryFn: cc.getCurrentUser,
    staleTime: Infinity,
  });
}

export function useGetTopTracks(userId: string) {
  return useQuery({
    queryKey: [keys.getTopTracks],
    queryFn: () => cc.getUsersTopTracks(userId),
  });
}

export function useGetPlaylists() {
  return useQuery({
    queryKey: [keys.getPlaylists],
    queryFn: cc.getPlaylists,
  });
}

/*
	Mutations
*/

export function useGetBasicAuthLink() {
  return useMutation({
    mutationFn: cc.getBasicAuthLink,
  });
}

export function useGetCuratorAuthLink() {
  return useMutation({
    mutationFn: cc.getCuratorAuthLink,
  });
}

export function useSetPermissions() {
  return useMutation({
    mutationFn: (body: SetPermissionsBody) => cc.setPermissions(body),
  });
}

export default {
  keys,
  useGetBasicAuthLink,
  useGetCuratorAuthLink,
  useSetPermissions,
  useUsers,
  useGetPlaylists,
  useGetTopTracks,
  useCurrentUser,
};
