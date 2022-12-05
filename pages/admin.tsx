import { Box, Typography } from "@mui/material";

import { CommonButton } from "../src/components/common";
import { NormalPage } from "../src/components/common/NormalPage";
import { PageHeader } from "../src/components/common/PageHeader";
import React from "react";
import { Spinner } from "../src/components/global/animations";
import { UserTable } from "../src/components/pages/admin";
import { cc } from "../src/services/cc";
import { getCookie } from "cookies-next";
import { permissions } from "../src/constants";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/use-user";

const Admin: React.FC = () => {
	const router = useRouter();
	const { data, isLoading, isAdmin } = useUser();
	const { mutateAsync: createCuratorToken } = useMutation(
		cc.createCuratorToken
	);
	//const [, getNewCuratorToken] = useGetNewCuratorTokenMutation();
	//const [, createPlaylist] = useCreatePlaylist()
	console.log("cookie: ", getCookie("token"));
	if (isLoading) return <Spinner />;

	//if (!isLoggedIn) router.push("/");

	if (!isAdmin) {
		router.replace("/").then(() => {
			toast.error("Admins only.", { id: "admins only" });
		});
		return null;
	}

	return (
		<NormalPage>
			<Box width="100%">
				<PageHeader text="Admin" />
				<Typography>The world is yours.</Typography>
				<CommonButton
					text="Create Curator Link"
					sx={{ marginTop: "12px" }}
					onClick={async () => {
						//const res = await createCuratorToken();
						//if (res.data?.getNewCuratorToken) {
						//	const token = res.data.getNewCuratorToken;
						//	await navigator.clipboard.writeText(
						//		`${root}${routes.join}?token=${token}`
						//	);
						//	toast.success("Copied to clipboard.");
						//} else {
						//	toast.error("Unsuccessful.");
						//}
					}}
				/>
				<CommonButton
					text="Create Playlist"
					sx={{ marginTop: "12px" }}
					//onClick={async () => createPlaylist())}
				/>
				<Box width="100%" marginTop="30px">
					<UserTable />
				</Box>
			</Box>
		</NormalPage>
	);
};

export default Admin;
