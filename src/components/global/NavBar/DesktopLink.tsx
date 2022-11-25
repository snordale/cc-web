import { Button, Typography } from "@mui/material";

import Link from "next/link";
import React from "react";
import { signatureGradientLight } from "../../../constants";

interface DesktopLinkProps {
	text: string;
	href?: string;
	onClick?: () => void;
	borderLeft?: boolean;
	borderRight?: boolean;
}

export const DesktopLink: React.FC<DesktopLinkProps> = ({
	text,
	href,
	onClick,
	borderLeft,
	borderRight,
}) => {
	const renderButton = () => {
		return (
			<Button
				variant="text"
				sx={{
					height: "100%",
					padding: "6px 18px",
					"&:hover": {
						background: signatureGradientLight,
					},
					borderRight: borderRight ? "1px solid black" : "none",
					borderLeft: borderLeft ? "1px solid black" : "none",
				}}
				onClick={onClick}
			>
				<Typography>{text}</Typography>
			</Button>
		);
	};

	if (href) {
		return (
			<Link href={href} style={{ textDecoration: "none" }}>
				{renderButton()}
			</Link>
		);
	}

	return renderButton();
};
