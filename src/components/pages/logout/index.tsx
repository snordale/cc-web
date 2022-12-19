import { Box, Typography } from "@mui/material";

import { NormalPage } from "../../common";
import { logout } from "../../../services/cc";
import { paddingX } from "../../../style";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const Logout = () => {
	const router = useRouter();

	useEffect(() => {
		async function helper() {
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
		}

		helper();
	}, []);

	return (
		<NormalPage>
			<Box width="100%">
				<Typography>Logging out...</Typography>
			</Box>
		</NormalPage>
	);
};
