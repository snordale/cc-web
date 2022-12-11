import { Box, Stack, Typography } from "@mui/material";
import { fontSize, fontSizes, paddingX } from "../../../style";

import { Link } from "./Link";
import React from "react";

export const Footer: React.FC = () => {
	return (
		<Box height="200px" paddingX={paddingX.global}>
			<Box display="flex">
				<Typography fontSize={fontSizes.header}>
					Common Collections
				</Typography>
			</Box>
			<Stack marginTop={2} spacing={1}>
				<Box display="flex">
					<Link text="Home" href="/" />
				</Box>
				{/*<Box display="flex">
					<Link text="About" href="/about" />
				</Box>*/}
				<Box display="flex">
					<Link text="Join" href="/join" />
				</Box>
			</Stack>
		</Box>
	);
};
