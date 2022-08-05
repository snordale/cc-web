import { Api, OpenInNew } from '@mui/icons-material'
import { Avatar, Box, Dialog, Link, Stack, Switch, Tooltip, Typography } from '@mui/material'
import { CommonButton, PageHeader } from '../src/components/common'
import React, { useEffect, useMemo, useState } from 'react'
import { SpotifyScopes, curatorRequiredScopes, permissions, requiredScopes, signatureGradientLight, spotifyScopeData } from '../src/constants'
import { useGetAuthLinkMutation, useGetUsersTopTracksQuery, useMeQuery } from '../src/generated/graphql'

import { NormalPage } from '../src/components/global/NormalPage'
import { Spinner } from '../src/components/global/animations'
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { getArrayDiff } from '../src/utils'
import { useMustLogin } from '../src/hooks'
import { useRouter } from "next/router"
import { withUrqlClient } from 'next-urql'

const Account: React.FC<{}> = ({ }) => {
	const router = useRouter()
	useMustLogin()

	const [, getAuthLink] = useGetAuthLinkMutation()
	const [{ data, fetching }] = useMeQuery()
	const [{ data: topTracks, fetching: fetchingTracks }] = useGetUsersTopTracksQuery({ variables: { id: 31 } })

	const [openDialog, setOpenDialog] = useState(false)
	const [scopes, setScopes] = useState<string[]>([])

	useEffect(() => {
		if (data && data.me && data.me.spotifyScopes) {
			setScopes(data?.me?.spotifyScopes.map(scope => SpotifyScopes[scope]))
		}
	}, [data])

		const getButtonText = (): string => {
			const diff = getArrayDiff(scopes, data?.me?.spotifyScopes.map(scope => SpotifyScopes[scope]))
			if (diff.length === 0) return "No Changes"
			if (
				data?.me?.permission === permissions.CURATOR &&
				!curatorRequiredScopes.every(scope => scopes.includes(scope))
			) {
				return "Resign as Curator"
			}
			if (!scopes.every(scope => data?.me?.spotifyScopes.includes(scope as any))) {
				return "Authorize with Spotify"
			}
			return "Save"
			// if scopes === me.spotifyScopes -> No Changes
			// else if user is curator and missing required scope -> Resign as Curator
			// else if scopes contains new scope -> Authorize with Spotify
			// else -> Save
			//if (scopes)
		}

	const buttonText = useMemo(() => {
		if (data && data.me && data.me.spotifyScopes) {
			return getButtonText()
		}
	}, [data, scopes])


	if (fetching || !data) return <Spinner />


	const handleRedirect = async () => {
		const res = await getAuthLink()
		if (res.data?.getAuthLink) router.replace(res.data?.getAuthLink)
	}

	const spotifyConnected = Boolean(data.me?.spotifyRefreshToken)

	const renderSpotifyStatus = () => {
		return (
			<Typography
				color={spotifyConnected ? "success.main" : "error.main"}
				fontWeight={600}
			>
				{spotifyConnected ? "Connected" : "Disconnected"}
			</Typography>
		)
	}

	const getAccountType = () => {
		switch (data.me?.permission) {
			case (permissions.NONE):
				return "Non-member"
			case (permissions.TIER1):
				return "Tier 1"
			case (permissions.TIER2):
				return "Tier 2"
			case (permissions.CURATOR):
				return "Curator"
			case (permissions.ADMIN):
				return "Admin"
			case (permissions.GOD):
				return "God"
		}
	}

	const handleDialogClose = () => {
		setOpenDialog(false)
	}

	const handleOpenDialog = () => {
		setOpenDialog(true)
	}

	const handlePermToggle = (_: React.ChangeEvent<HTMLInputElement>, targetScope: string) => {
		if (scopes.includes(targetScope)) {
			setScopes(prev => prev.filter(scope => scope !== targetScope))
		}
		else {
			setScopes(prev => [...prev, targetScope])
		}
	}


	return (
		<NormalPage>
			<Stack
				width="100%"
				spacing="12px"
			>
				<PageHeader text="Account" />
				<Avatar
					src={data.me?.profilePhoto ?? ""}
					sx={{
						background: signatureGradientLight,
						color: "black"
					}}
				>
					{data.me?.username.slice(0, 1)}
				</Avatar>
				<Typography>{!fetching && data.me?.username}</Typography>
				<Typography>{getAccountType()}</Typography>
				<Stack
					border="1px solid black"
					padding="18px"
					spacing="12px"
				>
					<Stack direction="row" justifyContent="space-between">
						<Stack direction="row" spacing="6px">
							<Typography>Spotify Link &#8211; </Typography>
							{renderSpotifyStatus()}
						</Stack>
						<CommonButton
							text={spotifyConnected ? "Manage" : "Connect"}
							onClick={spotifyConnected ? handleOpenDialog : handleRedirect}
						/>
					</Stack>
					<Dialog
						open={openDialog}
						onClose={handleDialogClose}
					>
						<Box padding="24px" minWidth="460px">
							<Typography fontSize="24px" fontWeight="600">
								Spotify Permissions
							</Typography>
							{Object.values(spotifyScopeData).map(data => (
								<Stack
									direction="row"
									alignItems="flex-end"
									spacing="12px"
									paddingY="4px"
								>
									<Stack
										direction="row"
									>

										<Typography
											fontSize={14}
											fontWeight="600"
											color={requiredScopes.includes(data.scope as SpotifyScopes) ? "#AAA" : "primary.main"}
										>
											{data.label}
											{curatorRequiredScopes.includes(data.scope as SpotifyScopes) && "*"}
										</Typography>
									</Stack>
									<Tooltip
										title={data.endpoint}
										sx={{
											marginLeft: "auto !important"
										}}
										disableInteractive
									>
										<Link href={data.link} target="_blank">
											<Api fontSize="small" />
										</Link>
									</Tooltip>
									<Switch
										checked={scopes.includes(data.scope)}
										onChange={(event) => handlePermToggle(event, data.scope)}

									/>
								</Stack>
							))}
						</Box>
						<CommonButton text={buttonText} />
					</Dialog>
				</Stack>
				{!fetchingTracks && (
					<>
						{topTracks?.getUsersTopTracks.tracks.map(track => {
							<Box>

								<Typography>{track.name}</Typography>
								<Link href={track.href}>Link</Link>
							</Box>
						})}
					</>
				)}
			</Stack>
		</NormalPage>
	)
}

export default withUrqlClient(createUrqlClient)(Account)