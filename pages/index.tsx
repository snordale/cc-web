import * as React from 'react'

import { Box, Container, Typography } from '@mui/material'

import { NavBar } from '../src/components/NavBar'
import type { NextPage } from 'next'
import { createUrqlClient } from '../src/utils/createUrqlClient'
import { useSongsQuery } from '../src/generated/graphql'
import { withUrqlClient } from 'next-urql';

const Home: NextPage = () => {
	const [{ data }] = useSongsQuery()

	if (!data) return null

	return (
		<>
			<NavBar />
			<div>common collections</div>
			{data.songs.map(song => {
				return (
					<div>
						<div>{song.id}</div>
						<div>{song.name}</div>
					</div>
				)
			})}
		</>
	)
}

export default withUrqlClient(createUrqlClient)(Home)
