import { Box, Fade } from "@mui/material";

import MuiLinearProgress from "@mui/material/LinearProgress";

const LinearProgress = () => {
  return (
    <Fade in={true} timeout={400}>
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MuiLinearProgress sx={{ width: "100%" }} />
      </Box>
    </Fade>
  );
};

export default LinearProgress;
