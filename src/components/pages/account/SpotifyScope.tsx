import {
	Accordion,
	AccordionSummary,
	Box,
	Dialog,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import {
	SpotifyScopes,
	curatorRequiredScopes,
	permissions,
	requiredScopes,
	spotifyScopeData,
} from "../../../constants";

import { Api } from "@mui/icons-material";
import { CommonButton } from "../../common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { getArrayDiff } from "../../../utils";
import { useMeQuery } from "../../../generated/graphql";
import { useUserPermission } from "../../../hooks/use-user-permission";

export enum FormStates {
	noChanges,
	resignAsCurator,
	renewAuth,
	save,
}

interface SpotifyScopeProps {
	scopes: string[];
	toggleScope: (
		_: React.ChangeEvent<HTMLInputElement>,
		targetScope: string
	) => void;
	formState: FormStates;
}

export const SpotifyScope: React.FC<SpotifyScopeProps> = ({
	scopes,
	toggleScope,
	formState,
}) => {
	const [{ data, fetching }] = useMeQuery();

	const { isCurator, fetching: fetchingPerm } = useUserPermission();

	const diff = useMemo(() => {
		return getArrayDiff(
			scopes,
			data?.me?.spotifyScopes.map((scope) => SpotifyScopes[scope])
		);
	}, [scopes, data]);

	const getButtonText = (): string => {
		switch (formState) {
			case FormStates.resignAsCurator:
				return "Resign as Curator";
			case FormStates.renewAuth:
				return "Renew Authorization";
			case FormStates.save:
				return "Save";
			default:
				return "No Changes";
		}
	};

	const buttonText = useMemo(() => {
		return getButtonText();
	}, [formState]);

	if (fetching || fetchingPerm) return null;

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="spotify-scope-content"
				id="spotify-scope-header"
			>
				<Typography>Spotify Scope</Typography>
			</AccordionSummary>
			<Box padding="24px" maxWidth="460px">
				{Object.values(spotifyScopeData).map((data) => (
					<Stack
						key={data.scope}
						direction="row"
						spacing="12px"
						paddingBottom="8px"
					>
						<Stack
							direction="row"
							spacing="12px"
							alignItems="flex-end"
						>
							<Typography fontSize={12} fontWeight="600">
								{data.label}
								{requiredScopes.includes(
									data.scope as SpotifyScopes
								) && "*"}
								{isCurator &&
									curatorRequiredScopes.includes(
										data.scope as SpotifyScopes
									) &&
									"**"}
							</Typography>
						</Stack>
						<Stack
							direction="row"
							spacing="12px"
							alignItems="flex-end"
							sx={{
								marginLeft: "auto !important",
							}}
						>
							{!requiredScopes.includes(
								data.scope as SpotifyScopes
							) &&
								(!isCurator ||
									!curatorRequiredScopes.includes(
										data.scope as SpotifyScopes
									)) && (
									<Switch
										checked={scopes.includes(data.scope)}
										onChange={(event) =>
											toggleScope(event, data.scope)
										}
										size="small"
									/>
								)}
							<Tooltip title={data.endpoint} disableInteractive>
								<Link href={data.link} target="_blank">
									<CommonButton
										size="small"
										sx={{
											minWidth: "40px",
										}}
									>
										<Api fontSize="small" />
									</CommonButton>
								</Link>
							</Tooltip>
						</Stack>
					</Stack>
				))}
				<Typography fontSize={10} fontWeight="600" paddingTop="12px">
					* Required
				</Typography>
				{isCurator && (
					<Typography fontSize={10} fontWeight="600">
						* Required as Curator
					</Typography>
				)}
			</Box>
		</Accordion>
	);
};
