import { Box, Button as MuiButton } from '@mui/material'

import React from 'react'
import { signatureGradientLight } from '../../constants'

interface ButtonProps {
	text: string
	disabled: boolean
	onClick: () => void
}

export const CommonButton: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
	return (
		<Box>
			<MuiButton
				variant="outlined"
				onClick={() => onClick()}
				disabled={disabled}
				sx={{
					borderColor: "primary.main",
					color: "primary.main",
					":hover": {
						background: signatureGradientLight
					},
					"&.Mui-disabled": {
						borderColor: "#aaa",
						color: "#aaa"
					}
				}}
			>
				{text}
			</MuiButton>
		</Box>
	)
}