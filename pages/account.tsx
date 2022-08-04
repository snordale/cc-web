import { Avatar, Box, Dialog, Link, Stack, Switch, Tooltip, Typography } from '@mui/material'
import { CommonButton, PageHeader } from '../src/components/common'
import React, { useMemo, useState } from 'react'
import { SpotifyScopes, permissions, signatureGradientLight, spotifyScopeData } from '../src/constants'
import { useGetAuthLinkMutation, useGetUsersTopTracksQuery, useMeQuery } from '../src/generated/graphql'

import { NormalPage } from '../src/components/global/NormalPage'
import { Spinner } from '../src/components/global/animations'
import { createUrqlClient } from '../src/utils/createUrqlClient'
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
	const [permInputs, setPermInputs] = useState<string[]>([])

	useMemo(() => {
		if (data && data.me) {
			if (data.me.spotifyScopes) {
				setPermInputs(data?.me?.spotifyScopes)
			}
		}
	}, [data])

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
									spacing="6px"
								>
									<Typography>{data.label}</Typography>
									<Tooltip title={data.endpoint} >
										<Link href={data.link} target="_blank">
											<Typography fontSize="12px" fontWeight="600">
												Endpoint
											</Typography>
										</Link>
									</Tooltip>
									<Switch
										value={permInputs.includes(data.scope)}
										setValue={() => handlePermToggle}
										sx={{
											marginLeft: "auto !important"
										}}
									/>
								</Stack>
							))}
						</Box>
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