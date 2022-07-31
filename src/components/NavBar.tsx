import { Box, Button, Stack } from '@mui/material'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

import Link from 'next/link'
import React from 'react'

export const NavBar: React.FC<{}> = ({ }) => {
	const [{ data, fetching: isLoading }] = useMeQuery()
	const [, logout] = useLogoutMutation()

	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="space-between"
			padding="12px 24px"
			bgcolor="secondary.main"
		>
			<Box>
				<Link href="/">
					<Button>
						CC
					</Button>
				</Link>
			</Box>
			<Stack
				direction="row"
				alignItems="center"
				bgcolor="secondary.main"
				spacing="18px"
			>
				{!isLoading && !data?.me && (
					<>
						<Link href="/login">
							<Button>
								Login
							</Button>
						</Link>
						<Link href="/join">
							<Button>
								Join
							</Button>
						</Link>
					</>
				)}
				{!isLoading && data?.me && (
					<>
					<Link href="/me">
						<Button>
							{data.me.username}
						</Button>
						</Link>
						<Button onClick={() => logout()}>
							Logout
						</Button>
					</>
				)}
			</Stack>
		</Box>
	)
}