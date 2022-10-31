import { Box, Typography } from "@mui/material";
import {
	useGetNewCuratorTokenMutation,
	useMeQuery,
} from "../src/generated/graphql";

import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { CommonButton } from "../src/components/common";
import { PageHeader } from "../src/components/common/PageHeader";
import { NormalPage } from "../src/components/global";
import { Spinner } from "../src/components/global/animations";
import { UserTable } from "../src/components/pages/admin";
import { permissions } from "../src/constants";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { root } from "../src/config";

const Admin: React.FC = () => {
	const router = useRouter();
	const [{ data, fetching }] = useMeQuery();
	const [, getNewCuratorToken] = useGetNewCuratorTokenMutation();
	//const [, createPlaylist] = useCreatePlaylist()

	if (fetching) return <Spinner />;

	if (data?.me?.permission !== permissions.ADMIN) {
		router.replace("/").then((_) => {
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
						const res = await getNewCuratorToken();
						if (res.data?.getNewCuratorToken) {
							const token = res.data.getNewCuratorToken;
							await navigator.clipboard.writeText(
								`${root}/join?token=${token}`
							);
							toast.success("Copied to clipboard.");
						} else {
							toast.error("Unsuccessful.");
						}
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

export default withUrqlClient(createUrqlClient)(Admin);
