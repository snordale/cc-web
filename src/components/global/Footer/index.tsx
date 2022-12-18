import { Box, Stack, Typography } from "@mui/material";

import { Link } from "../../common";
import React from "react";
import { isPrerelease } from "../../../config";
import { paddingX } from "../../../style";

export const Footer: React.FC = () => {
	return (
		<Box
			paddingX={paddingX.global}
			paddingY={["32px", "50px"]}
			borderTop="1px solid #c4c4c4"
			width="100%"
			display="flex"
			justifyContent="space-between"
		>
			<Link text="Common Collections" href="/" fontSize={16} />
			{/*
			<Typography fontSize={16} marginRight="auto">
				Common Collections
			</Typography>*/}
			{/*<Box display="flex" flexDirection={["column", "row"]} gap={[1, 5]}>
				<Stack spacing={1}>
					<Box display="flex">
						<Link text="Home" href="/" />
					</Box>
					{!isPrerelease && (
						<>
							<Box display="flex">
								<Link text="About" href="/about" />
							</Box>
							<Box display="flex">
								<Link text="Join" href="/join" />
							</Box>
						</>
					)}
				</Stack>
			</Box>*/}
		</Box>
	);
};
