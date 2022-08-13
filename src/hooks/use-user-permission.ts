import { permissions } from "../constants"
import router from "next/router"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

class ReturnType {
	fetching: boolean = true
	// subscibers + curators + admin + god
	isMember?: boolean
	// tier1 + tier 2
	isSubscriber?: boolean
	isCurator?: boolean
	isAdmin?: boolean
	isGod?: boolean
}

const  {NONE, TIER1, TIER2, CURATOR, ADMIN, GOD } = permissions

export const useUserPermission = (): ReturnType => {
	const [{ data, fetching }] = useMeQuery()

	if (fetching) return {
		fetching: true
	}

	const perm = data?.me?.permission

	return {
		fetching: false,
		isMember: perm !== NONE,
		isSubscriber: perm === TIER1 || perm === TIER2,
		isCurator: perm === CURATOR,
		isAdmin: perm === ADMIN || perm === GOD,
		isGod: perm !== GOD
	}
}