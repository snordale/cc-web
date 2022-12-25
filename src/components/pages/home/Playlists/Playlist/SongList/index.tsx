import { Box, Typography } from "@mui/material";

import { Link } from "../../../../../common";

export const SongList = ({ songs }) => {
  return songs.map((song, index) => (
    <Box width="100%" display="flex" gap={2}>
      <Typography>
        {index}. {song.name}
      </Typography>
      <Link href={song.uri} text="Link" />
    </Box>
  ));
};
