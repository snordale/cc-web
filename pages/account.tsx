import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import { CommonButton, PageHeader } from "../src/components/common";
import React, { useEffect, useMemo, useState } from "react";
import {
	curatorRequiredScopes,
	permissions,
	requiredScopes,
	signatureGradientLight,
} from "../src/constants";
import { green, red } from "@mui/material/colors";
import { useGetBasicAuthLink, useGetCuratorAuthLink } from "../src/services/rq";

import { FormStates } from "../src/components/pages/account";
import { NormalPage } from "../src/components/common/NormalPage";
import { getArrayDiff } from "../src/utils";
import { paddingX } from "../src/style";
import toast from "react-hot-toast";
import { useRequireLogin } from "../src/hooks";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/use-user";

//import { useUserPermission } from "../src/hooks/use-user-permission";

const Account: React.FC = () => {
	const router = useRouter();

	useRequireLogin();

	const { data, isLoading, isCurator, isAdmin } = useUser();
	//const { data: topTracksData, isLoading: isLoadingTracks } = useGetTopTracks(
	//	data?.user.id
	//);
	const { mutateAsync: getBasicAuthLink } = useGetBasicAuthLink();
	const { mutateAsync: getCuratorAuthLink } = useGetCuratorAuthLink();

	const [openDialog, setOpenDialog] = useState(false);
	const [scopes, setScopes] = useState<string[]>([]);

	const currentScopes: string[] = data?.user?.spotifyScopes ?? [];

	useEffect(() => {
		if (currentScopes) {
			setScopes(currentScopes);
		}
	}, [data]);

	const formState = useMemo(() => {
		const diff = getArrayDiff(scopes, currentScopes);

		if (diff.length === 0) return FormStates.noChanges;
		if (
			data?.user?.permission === permissions.curator &&
			!curatorRequiredScopes.every((scope) => scopes.includes(scope))
		) {
			return FormStates.resignAsCurator;
		}
		if (!scopes.every((scope) => currentScopes.includes(scope as any))) {
			return FormStates.renewAuth;
		}
		return FormStates.save;
	}, [scopes, data]);

	const hasRequiredScope = useMemo(() => {
		if (currentScopes) {
			const hasBasicScope = requiredScopes.every((rqd) =>
				currentScopes.includes(rqd as string)
			);

			if (!isCurator && !isAdmin) return hasBasicScope;

			return curatorRequiredScopes.every((rqd) =>
				currentScopes.includes(rqd)
			);
		}
		return false;
	}, [data]);

	const handleSpotifyConnect = async () => {
		const data =
			isCurator || isAdmin
				? await getCuratorAuthLink()
				: await getBasicAuthLink();

		if (data.link) {
			router.replace(data.link);
		} else {
			toast.error("Something went wrong.", { id: "error" });
		}
	};

	const spotifyConnected = !!data?.user?.spotifyRefreshToken;

	const renderSpotifyStatus = () => {
		return (
			<Typography
				color={spotifyConnected ? "success.main" : "error.main"}
				fontWeight={600}
			>
				{spotifyConnected ? "Connected" : "Disconnected"}
			</Typography>
		);
	};

	const getAccountType = () => {
		if (!data?.user) return "";

		switch (data?.user.permission) {
			case permissions.none:
				return "Non-member";
			case permissions.tier1:
				return "Tier 1";
			case permissions.tier2:
				return "Tier 2";
			case permissions.curator:
				return "Curator";
			case permissions.admin:
				return "Admin";
			case permissions.god:
				return "God";
		}
	};

	return (
		<NormalPage>
			<Stack width="100%" spacing="12px">
				<PageHeader text="Account" />
				<Avatar
					src={data?.user?.profilePhoto ?? ""}
					sx={{
						background: signatureGradientLight,
						color: "black",
					}}
				>
					{data?.user?.username.slice(0, 1)}
				</Avatar>
				<Typography fontSize="18px" fontWeight="600">
					{data?.user?.username}
				</Typography>
				<Typography fontSize="14px" fontWeight="600">
					Account Type
				</Typography>
				<Typography>{getAccountType()}</Typography>
				<Stack paddingBottom="18px" spacing="12px">
					<Stack direction="row" spacing="6px">
						<Typography fontSize="14px" fontWeight="600">
							Spotify Link
						</Typography>
					</Stack>
					<Typography
						color={hasRequiredScope ? green[900] : red[900]}
					>
						{hasRequiredScope
							? "Authenticated"
							: "Not Authenticated"}
					</Typography>
					<CommonButton
						text={"Authenticate"}
						onClick={handleSpotifyConnect}
					/>
				</Stack>
			</Stack>
		</NormalPage>
	);
};

export default Account;
