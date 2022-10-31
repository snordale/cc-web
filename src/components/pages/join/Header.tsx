import { Box, Typography } from "@mui/material";

import { PageHeader } from "../../common";
import React from "react";

interface HeaderProps {
	curatorToken: string;
}

export const Header: React.FC<HeaderProps> = ({ curatorToken }) => {
	const text = curatorToken
		? "The red carpet is waiting..."
		: "The party is waiting...";

	return (
		<Box paddingBottom="24px">
			<Typography fontSize="24px">{text}</Typography>
		</Box>
	);
};
