import NextLink from "next/link";
import React from "react";
import { Typography } from "@mui/material";

interface Props {
	text: string;
	href?: string;
	[rest: string]: any;
}

export const Link: React.FC<Props> = ({ text, href, ...rest }) => {
	const renderText = () => {
		return (
			<Typography
				color="black"
				sx={{
					":hover": {
						textDecoration: "underline",
					},
				}}
				{...rest}
			>
				{text}
			</Typography>
		);
	};

	if (href) {
		return (
			<NextLink href={href} style={{ textDecoration: "none" }}>
				{renderText()}
			</NextLink>
		);
	}

	return renderText();
};
