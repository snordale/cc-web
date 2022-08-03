import router from "next/router"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useMustLogin = () => {
	const [{ data, fetching}] = useMeQuery()

	useEffect(() => {
		if (!fetching && !data?.me) {
			toast.error("Not logged in.", { id: "Not logged in." })
			router.replace(`/login?next=${router.pathname}`)
		}
	}, [fetching, data])
}