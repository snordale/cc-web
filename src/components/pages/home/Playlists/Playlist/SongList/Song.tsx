import { Box, IconButton, TableCell, TableRow } from "@mui/material";

import { OpenInNew } from "@mui/icons-material";
import { PreviewIcon } from "./PreviewIcon";
import { formatDuration } from "../../../../../../utils";
import { useAudio } from "../../../../../../hooks/use-audio";
import { useEffect } from "react";

export const Song = ({ song, index, songPlaying, setSongPlaying }) => {
  const { isPlaying, toggle } = useAudio(song.preview);

  useEffect(() => {
    if (isPlaying && songPlaying.id !== song.id) toggle();
  }, [songPlaying]);

  const handlePreviewClick = () => {
    toggle();
    setSongPlaying(song);
  };
  console.log(song);
  return (
    <TableRow
      key={song.isrc}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="right">
        {index}
      </TableCell>
      <TableCell>{song.name}</TableCell>
      <TableCell>{song.artists.join(", ")}</TableCell>
      <TableCell align="right">{formatDuration(song.duration)}</TableCell>
      <TableCell align="right">{song.popularity}</TableCell>
      <TableCell>
        <PreviewIcon
          url={song.preview}
          isPlaying={isPlaying}
          handlePreviewClick={handlePreviewClick}
        />
      </TableCell>
      <TableCell>
        <Box display="flex" justifyContent="center">
          <IconButton color="primary" aria-label="spotify-link" href={song.uri}>
            <OpenInNew fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
