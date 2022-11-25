import { Box, Stack, Typography } from "@mui/material";

import React from "react";
import { useRouter } from "next/router";

export const Footer: React.FC = () => {
	const router = useRouter();

	return (
		<Box height="200px">
			<Stack>
				<Typography>Home</Typography>
				<Typography>About</Typography>
				<Typography>Login</Typography>
				<Typography>Join</Typography>
			</Stack>
		</Box>
	);
};
