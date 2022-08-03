import { permissions } from "../constants";

export const isAdmin = (perm: string) => (
	perm === permissions.ADMIN || perm === permissions.GOD
)