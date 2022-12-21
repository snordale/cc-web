import { SetPermissionsBody, cc } from "./cc";
import { useMutation, useQuery } from "@tanstack/react-query";

/*
	Queries
*/

export function useUsers() {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: cc.getUsers,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: cc.getCurrentUser,
  });
}

export function useGetTopTracks(userId: string) {
  return useQuery({
    queryKey: ["getTopTracks"],
    queryFn: () => cc.getUsersTopTracks(userId),
  });
}

export function useGetPlaylists() {
  return useQuery({
    queryKey: ["getPlaylists"],
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
