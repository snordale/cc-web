import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { useGetAuthLinkMutation, useMeQuery } from '../src/generated/graphql'

import { CommonButton } from '../src/components/common'
import { NormalPage } from '../src/components/global/NormalPage'
import React from 'react'
import { Spinner } from '../src/components/global/animations'
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { signatureGradientLight } from '../src/constants'
import { useMustLogin } from '../src/hooks'
import { useRouter } from "next/router"
import { withUrqlClient } from 'next-urql'

const Profile: React.FC<{}> = ({ }) => {
	const router = useRouter()
	useMustLogin()

	const [, getAuthLink] = useGetAuthLinkMutation()
	const [{ data, fetching }] = useMeQuery()

	if (fetching || !data) return <Spinner />

	const handleRedirect = async () => {
		const res = await getAuthLink()
		if (res.data?.getAuthLink) router.replace(res.data?.getAuthLink)
	}

	const spotifyConnected = Boolean(data.me?.spotifyRefreshToken)

	return (
		<NormalPage>
			<Stack
				width="100%"
				spacing="12px"
			>
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
				<CommonButton
					text={spotifyConnected ? "Spotify Connected" : "Connect Spotify"}
					disabled={spotifyConnected}
					onClick={handleRedirect}
				/>
			</Stack>
		</NormalPage>
	)
}

export default withUrqlClient(createUrqlClient)(Profile)