import { Link } from "../../common";
import { cc } from "../../../services/cc";
import { routes } from "../../../utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const PrivateLinks = () => {
	const router = useRouter();

	const { isAdmin } = useUser();

	const { mutateAsync: logout } = useMutation({
		mutationFn: cc.logout,
	});

	return (
		<>
			{isAdmin && <Link text="Admin" href="/admin" />}
			<Link text="Account" href={routes.account} />
			<Link
				text="Logout"
				onClick={async () => {
					const { success } = await logout();
					if (success) {
						router.replace("/").then(() => {
							toast.success("Logged out.", {
								id: "logout",
							});
						});
					} else {
						toast.error("Unable to logout.", {
							id: "error",
						});
					}
				}}
			/>
		</>
	);
};

export default PrivateLinks;
