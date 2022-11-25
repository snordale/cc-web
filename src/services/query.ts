import { useMutation, useQuery } from "@tanstack/react-query";

import { cc } from "./cc";

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

