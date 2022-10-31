import { Avatar, Box, Link, Stack, Tooltip, Typography } from "@mui/material";
import { CommonButton, Dialog, PageHeader } from "../src/components/common";
import { FormStates, SpotifyScope } from "../src/components/pages/account";
import { NormalPage, Spinner } from "../src/components/global";
import React, { useEffect, useMemo, useState } from "react";
import {
	SpotifyScopes,
	curatorRequiredScopes,
	permissions,
	requiredScopes,
	signatureGradientLight,
	spotifyScopeData,
} from "../src/constants";
import {
	useGetBasicAuthLinkMutation,
	useGetCuratorAuthLinkMutation,
	useGetUsersTopTracksQuery,
	useMeQuery,
} from "../src/generated/graphql";

import { Api } from "@mui/icons-material";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { getArrayDiff } from "../src/utils";
import toast from "react-hot-toast";
import { useRequireLogin } from "../src/hooks";
import { useRouter } from "next/router";
import { useUserPermission } from "../src/hooks/use-user-permission";
import { withUrqlClient } from "next-urql";

const Account: React.FC<{}> = ({}) => {
	const router = useRouter();

	useRequireLogin();

	const [, getCuratorAuthLink] = useGetCuratorAuthLinkMutation();
	const [, getBasicAuthLink] = useGetBasicAuthLinkMutation();

	const [{ data, fetching }] = useMeQuery();
	const [{ data: topTracks, fetching: fetchingTracks }] =
		useGetUsersTopTracksQuery({ variables: { id: 31 } });

	const { isCurator } = useUserPermission();

	const [openDialog, setOpenDialog] = useState(false);
	const [scopes, setScopes] = useState<string[]>([]);

	const currentScopes: string[] =
		data?.me?.spotifyScopes.map((scope) => SpotifyScopes[scope]) ?? [];

	useEffect(() => {
		if (currentScopes) {
			setScopes(currentScopes);
		}
	}, [data]);

	const formState = useMemo(() => {
		const diff = getArrayDiff(scopes, currentScopes);

		if (diff.length === 0) return FormStates.noChanges;
		if (
			data?.me?.permission === permissions.CURATOR &&
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
		console.log("scopes log");
		console.log(currentScopes);
		console.log(requiredScopes);
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

	if (fetching || !data) return <Spinner />;

	const handleRedirect = async () => {
		if (isCurator) {
			const res = await getCuratorAuthLink();
			if (!res.data) {
				toast.error("Something went wrong.", { id: "something" });
			} else {
				router.replace(res.data?.getCuratorAuthLink);
			}
			return;
		} else {
			const res = await getBasicAuthLink();
			if (!res.data) {
				toast.error("Something went wrong.", { id: "something" });
			} else {
				router.replace(res.data?.getBasicAuthLink);
			}
			return;
		}
	};

	const spotifyConnected = Boolean(data.me?.spotifyRefreshToken);

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
		switch (data.me?.permission) {
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

	const handleDialogClose = () => {
		setOpenDialog(false);
	};

	const handleOpenDialog = () => {
		setOpenDialog(true);
	};

	const toggleScope = (
		_: React.ChangeEvent<HTMLInputElement>,
		targetScope: string
	) => {
		if (scopes.includes(targetScope)) {
			setScopes((prev) => prev.filter((scope) => scope !== targetScope));
		} else {
			setScopes((prev) => [...prev, targetScope]);
		}
	};

	return (
		<NormalPage>
			<Stack width="100%" spacing="12px">
				<PageHeader text="Account" />
				<Avatar
					src={data.me?.profilePhoto ?? ""}
					sx={{
						background: signatureGradientLight,
						color: "black",
					}}
				>
					{data.me?.username.slice(0, 1)}
				</Avatar>
				<Typography fontSize="18px" fontWeight="600">
					{!fetching && data.me?.username}
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
						onClick={handleRedirect}
					/>
				</Stack>
				{!fetchingTracks && (
					<>
						{topTracks?.getUsersTopTracks.tracks.map((track) => {
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

export default withUrqlClient(createUrqlClient)(Account);
