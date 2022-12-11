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
				onClick={onClick}
				sx={{
					":hover": {
						textDecoration: "underline",
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
					marginTop: "8px",
					marginBottom: "8px",
				}}
			>
				{renderText()}
			</NextLink>
		);
	}

	return renderText();
};
