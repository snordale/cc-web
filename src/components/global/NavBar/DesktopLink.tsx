import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { signatureGradientLight } from '../../../constants'

interface DesktopLinkProps {
	text: string
	href?: string
	onClick?: () => void
	borderLeft?: boolean
	borderRight?: boolean
}

export const DesktopLink: React.FC<DesktopLinkProps> = ({
	text, href, onClick, borderLeft, borderRight
}) => {

	const renderButton = () => {
		return (
			<Button
				sx={{
					padding: "12px 18px",
					"&:hover": {
						//bgcolor: "green.main"
						background: signatureGradientLight
					},
					borderRight: borderRight ? "1px solid black" : "none",
					borderLeft: borderLeft ? "1px solid black" : "none"
				}}
				onClick={onClick}
			>
				{text}
			</Button>
		)
	}

	if (href) {
		return (
			<Link href={href}>
				{renderButton()}
			</Link>
		)
	}

	return renderButton()
}