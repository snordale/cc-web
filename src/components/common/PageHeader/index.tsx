import React from 'react'
import { Typography } from '@mui/material'

export const PageHeader: React.FC<{text: string}> = ({ text }) => {
	return (
		<Typography
			fontSize="30px"
			fontWeight="500"
		>
			{text}
		</Typography>
	)
}