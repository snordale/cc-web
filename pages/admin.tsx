import { Box, Typography } from '@mui/material'
import { LoadingBar, Spinner } from '../src/components/global/animations'
import { useMeQuery, useUsersQuery } from '../src/generated/graphql'

import { NormalPage } from '../src/components/global'
import { PageHeader } from '../src/components/common/PageHeader'
import React from 'react'
import { UserTable } from "../src/components/pages/admin"
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { permissions } from '../src/constants'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'

const Admin: React.FC<{}> = ({ }) => {
	const router = useRouter()
	const [{ data, fetching }] = useMeQuery()

	if (fetching) return <Spinner />

	if (data?.me?.permission !== permissions.ADMIN) {
		router.replace("/").then(_ => {
			toast.error("Admins only.", { id: "admins only" })
		})
		return null
	}

	return (
		<NormalPage>
			<Box width="100%">
				<PageHeader text="Admin" />
				<Typography>The world is yours.</Typography>
				<Box
					width="100%"
					marginTop="30px"
				>
					<UserTable />
				</Box>
			</Box>
		</NormalPage>
	)
}

export default withUrqlClient(createUrqlClient)(Admin)