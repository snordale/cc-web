import { Box, Button, Stack } from '@mui/material'
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql'

import { DesktopLink } from './DesktopLink'
import React from 'react'
import { isAdmin } from '../../../utils'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

export const NavBar: React.FC<{}> = ({ }) => {
	const router = useRouter()
	const [{ data, fetching: isLoading }] = useMeQuery()
	const [, logout] = useLogoutMutation()

	return (
		<Box
			width="100%"
			display="flex"
			justifyContent="space-between"
			position="sticky"
			top="0px"
			zIndex={1}
			sx={{
				outline: "1px solid black"
			}}
		>
			<Box
				display="flex"
				flexDirection="row"
			>
				<DesktopLink
					text="Common Collections"
					href="/"
					borderRight
				/>
			</Box>
			<Stack direction="row" >
				{!isLoading && !data?.me && (
					<>
						<DesktopLink
							text="Login"
							href="/login"
							borderLeft
						/>
						<DesktopLink
							text="Join"
							href="/join"
							borderLeft
						/>
					</>
				)}
				{!isLoading && data?.me && (
					<>
						{isAdmin(data?.me.permission) && (
							<DesktopLink
								text="Admin"
								href="/admin"
								borderLeft
							/>
						)}
						<DesktopLink
							text="Account"
							href="/account"
							borderLeft
						/>
						<DesktopLink
							text="Logout"
							onClick={() => {
								router.replace("/").then(_ => {
									logout()
									toast.success("Logged out.", { id: "logout" })
								})
							}}
							borderLeft
						/>
					</>
				)}
			</Stack>
		</Box>
	)
}