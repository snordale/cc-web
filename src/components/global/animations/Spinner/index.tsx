import { Box, CircularProgress } from "@mui/material";

export const Spinner: React.FC = () => {
	return (
		<Box
			display="flex"
			position="absolute"
			height="100vh"
			width="100%"
			justifyContent="center"
			alignItems="center"
		>
			<CircularProgress />
		</Box>
	);
};
