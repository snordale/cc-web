import { Box, Typography } from "@mui/material";

import React from "react";

interface HeaderProps {
	curatorToken: string;
}

export const Header: React.FC<HeaderProps> = ({ curatorToken }) => {
	const text = curatorToken ? "Thanks for coming." : "Welcome.";

	return (
		<Box>
			<Typography fontSize={16}>{text}</Typography>
		</Box>
	);
};
