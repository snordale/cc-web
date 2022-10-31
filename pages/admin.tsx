import { Box, Typography } from "@mui/material";
import {
	useGetNewCuratorTokenMutation,
	useMeQuery,
} from "../src/generated/graphql";

import { CommonButton } from "../src/components/common";
import { NormalPage } from "../src/components/global";
import { PageHeader } from "../src/components/common/PageHeader";
import React from "react";
import { Spinner } from "../src/components/global/animations";
import { UserTable } from "../src/components/pages/admin";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { permissions } from "../src/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";

const Admin: React.FC<{}> = ({}) => {
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
								`http://localhost:3000/join?token=${token}`
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
