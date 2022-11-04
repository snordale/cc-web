import { Box, Stack, Typography } from "@mui/material";
import { useLogoutMutation, useMeQuery } from "../../../generated/graphql";

import { useRouter } from "next/router";
import React from "react";

export const Footer: React.FC = () => {
	const router = useRouter();
	const [{ data, fetching: isLoading }] = useMeQuery();
	const [, logout] = useLogoutMutation();

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
