import { Box, Stack, Typography } from "@mui/material";

import { Link } from "./Link";
import React from "react";
import { isPrerelease } from "../../../config";
import { paddingX } from "../../../style";

export const Footer: React.FC = () => {
	return (
		<Box
			paddingX={paddingX.global}
			paddingY={["32px", "50px"]}
			borderTop="1px solid #c4c4c4"
		>
			<Box display="flex" flexDirection={["column", "row"]} gap={[1, 5]}>
				<Typography fontSize={20}>Common Collections</Typography>
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
			</Box>
		</Box>
	);
};
