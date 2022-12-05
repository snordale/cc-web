import { Box, Stack } from "@mui/material";

import { DesktopLink } from "./DesktopLink";
import React from "react";
import { cc } from "../../../services/cc";
import { isAdmin } from "../../../utils";
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
			sx={{
				outline: "1px solid black",
			}}
		>
			<Box display="flex" flexDirection="row">
				<DesktopLink
					text="Common Collections"
					href={user ? "/home" : "/"}
					borderRight
				/>
			</Box>
			<Stack direction="row">
				{!isLoading && !user && (
					<>
						<DesktopLink
							text="Login"
							href={routes.login}
							borderLeft
						/>
						<DesktopLink
							text="Join"
							href={routes.join}
							borderLeft
						/>
					</>
				)}
				{!isLoading && user && (
					<>
						{isAdmin(user.permission) && (
							<DesktopLink
								text="Admin"
								href="/admin"
								borderLeft
							/>
						)}
						<DesktopLink
							text="Account"
							href={routes.account}
							borderLeft
						/>
						<DesktopLink
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
							borderLeft
						/>
					</>
				)}
			</Stack>
		</Box>
	);
};
