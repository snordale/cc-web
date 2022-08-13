import { Box, Button as MuiButton, SxProps, Theme } from '@mui/material'

import React from 'react'
import { signatureGradientLight } from '../../constants'

interface ButtonProps {
	text?: string
	size?: "small" | "medium" | "large"
	href?: string
	disabled?: boolean
	sx?: SxProps<Theme>
	variant?: "outlined" | "contained" | "text"
	onClick?: () => void
	children?: React.ReactNode
}

export const CommonButton: React.FC<ButtonProps> = ({
	text,
	size = "medium",
	href,
	disabled,
	sx,
	variant = "outlined",
	onClick,
	children,
}) => {
	return (
		<Box>
			<MuiButton
				variant={variant}
				size={size}
				href={href}
				onClick={onClick}
				disabled={disabled}
				sx={[
					{
						borderColor: "primary.main",
						color: "primary.main",
						":hover": {
							background: signatureGradientLight
						},
						"&.Mui-disabled": {
							borderColor: "#aaa",
							color: "#aaa"
						}
					},
					...(Array.isArray(sx) ? sx : [sx])
				]}
			>
				{text}
				{children}
			</MuiButton>
		</Box>
	)
}