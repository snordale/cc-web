import router from "next/router"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"

export const useIsLoggedIn = () => {
	const [{ data, fetching}] = useMeQuery()

	useEffect(() => {
		console.log("data.me")
		console.log(data?.me)
		if (!fetching && data?.me) {
			toast.success(`Welcome ${data.me.username}.`, { id: "welcome" })
			router.replace(`/`)
		}
	}, [fetching, data])
}