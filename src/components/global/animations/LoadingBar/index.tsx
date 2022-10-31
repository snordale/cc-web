import { Box, LinearProgress } from "@mui/material";

import { signatureGradient } from "../../../../constants";

export const LoadingBar: React.FC = () => {
	return (
		<Box>
			<LinearProgress
				sx={{
					backgroundColor: "none",
					background: signatureGradient,
					span: {
						backgroundColor: "none",
						background: "inherit",
					},
				}}
			/>
		</Box>
	);
};
