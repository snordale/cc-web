import NextLink from "next/link";
import React from "react";
import { Typography } from "@mui/material";

interface Props {
	text: string;
	href?: string;
	onClick?: () => void;
}

export const Link: React.FC<Props> = ({ text, href, onClick }) => {
	const renderText = () => {
		return (
			<Typography
				color="black"
				fontSize="16px"
				marginY="8px"
				onClick={onClick}
				sx={{
					":hover": {
						textDecoration: "none",
						opacity: 0.5,
						//cursor: "pointer",
					},
				}}
			>
				{text}
			</Typography>
		);
	};

	if (href) {
		return (
			<NextLink
				href={href}
				style={{
					textDecoration: "none",
				}}
			>
				{renderText()}
			</NextLink>
		);
	}

	return renderText();
};
