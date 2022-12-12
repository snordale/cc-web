import { Box, Stack } from "@mui/material";

import { Link } from "./Link";
import React from "react";
import { cc } from "../../../services/cc";
import { isAdmin } from "../../../utils";
import { paddingX } from "../../../style";
import { routes } from "../../../utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const NavBar: React.FC = () => {
	const router = useRouter();

	const { data, isLoading } = useUser();
	const { mutateAsync: logout } = useMutation({
		mutationFn: cc.logout,
	});

	const user = data ? data.user : null;

	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="space-between"
			position="sticky"
			top="0px"
			zIndex={1}
			paddingX={paddingX.global}
			sx={{
				outline: "1px solid black",
				backgroundColor: "white",
			}}
		>
			<Box display="flex" flexDirection="row">
				<Link text="Common Collections" href={user ? "/home" : "/"} />
			</Box>
			<Box display="flex" gap={[1, 2]}>
				{!isLoading && !user && (
					<>
						<Link text="Login" href={routes.login} />
						<Link text="Join" href={routes.join} />
					</>
				)}
				{!isLoading && user && (
					<>
						{isAdmin(user.permission) && (
							<Link text="Admin" href="/admin" />
						)}
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
				)}
			</Box>
		</Box>
	);
};
