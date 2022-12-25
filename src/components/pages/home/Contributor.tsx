import { Box, Typography } from "@mui/material";

import { Playlists } from "./Playlists";

export const Contributor: React.FC = () => {
  return (
    <Box>
      <Typography>Contributor View.</Typography>
      <Playlists />
    </Box>
  );
};
