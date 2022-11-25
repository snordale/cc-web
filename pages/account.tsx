import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import { CommonButton, PageHeader } from "../src/components/common";
import React, { useEffect, useMemo, useState } from "react";
import {
	curatorRequiredScopes,
	permissions,
	requiredScopes,
	signatureGradientLight,
} from "../src/constants";
import {
	useCurrentUser,
	useGetBasicAuthLink,
	useGetCuratorAuthLink,
	useGetTopTracks,
} from "../src/services/query";

import { FormStates } from "../src/components/pages/account";
import { NormalPage } from "../src/components/common/NormalPage";
import { Spinner } from "../src/components/global";
import { getArrayDiff } from "../src/utils";
import toast from "react-hot-toast";
import { useRequireLogin } from "../src/hooks";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/use-user";

//import { useUserPermission } from "../src/hooks/use-user-permission";

const Account: React.FC = () => {
	const router = useRouter();

	useRequireLogin();

	const { data, isLoading, isCurator } = useUser();
	const { data: topTracksData, isLoading: isLoadingTracks } = useGetTopTracks(
		data?.user.id
	);
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
			data?.user?.permission === permissions.CURATOR &&
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

			if (!isCurator) return hasBasicScope;

			return curatorRequiredScopes.every((rqd) =>
				currentScopes.includes(rqd)
			);
		}
		return false;
	}, [data]);

	const handleSpotifyConnect = async () => {
		const data = isCurator
			? await getCuratorAuthLink()
			: await getBasicAuthLink();

		console.log("data: ", data);

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
		switch (data?.user.permission) {
			case permissions.NONE:
				return "Non-member";
			case permissions.TIER1:
				return "Tier 1";
			case permissions.TIER2:
				return "Tier 2";
			case permissions.CURATOR:
				return "Curator";
			case permissions.ADMIN:
				return "Admin";
			case permissions.GOD:
				return "God";
		}
	};

	console.log("topTracksData");
	console.log(topTracksData);

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
					<CommonButton
						text={hasRequiredScope ? "Connected" : "Connect"}
						disabled={hasRequiredScope}
						onClick={handleSpotifyConnect}
					/>
				</Stack>
				{topTracksData && topTracksData.tracks && (
					<>
						{topTracksData?.tracks.map((track: any) => {
							<Box>
								<Typography>{track.name}</Typography>
								<Link href={track.href}>Link</Link>
							</Box>;
						})}
					</>
				)}
			</Stack>
		</NormalPage>
	);
};

export default Account;
