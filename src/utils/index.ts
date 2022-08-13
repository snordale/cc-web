import { permissions } from "../constants";

export const isAdmin = (perm: string) => (
	perm === permissions.ADMIN || perm === permissions.GOD
)

export const getArrayDiff = (arr1: any = [], arr2: any = []): any[]  => {
	return arr1
		.filter((x: any) => !arr2.includes(x))
		.concat(arr2.filter((x: any) => !arr1.includes(x)));
}