import { Box } from "@mui/material";
import MuiLinearProgress from "@mui/material/LinearProgress";

const LinearProgress = () => {
	return (
		<Box
			height="100vh"
			width="100vw"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<MuiLinearProgress sx={{ width: "100%" }} />;
		</Box>
	);
};

export default LinearProgress;
