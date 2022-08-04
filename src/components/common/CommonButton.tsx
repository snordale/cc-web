import { Box, Button as MuiButton } from '@mui/material'

import React from 'react'
import { signatureGradientLight } from '../../constants'

interface ButtonProps {
	text?: string
	size?: "small" | "medium" | "large"
	href?: string
	disabled?: boolean
	onClick?: () => void
	children?: React.ReactNode
}

export const CommonButton: React.FC<ButtonProps> = ({
	text,
	disabled,
	onClick,
	href,
	children,
	size = "medium",
}) => {
	return (
		<Box>
			<MuiButton
				size={size}
				variant="outlined"
				href={href}
				onClick={onClick}
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
				{children}
			</MuiButton>
		</Box>
	)
}