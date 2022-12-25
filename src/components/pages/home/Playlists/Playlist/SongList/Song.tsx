import { IconButton, TableCell, TableRow } from "@mui/material";
import { PauseCircle, PlayCircle } from "@mui/icons-material";

import { useAudio } from "../../../../../../hooks/use-audio";

const Song = ({ song, index }) => {
  const { isPlaying, toggle } = useAudio(song.preview);

  const handlePreviewClick = () => {
    toggle();
  };

  return (
    <TableRow
      key={song.isrc}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index}
      </TableCell>
      <TableCell>{song.name}</TableCell>
      <TableCell>{song.artists}</TableCell>
      <TableCell>{song.Popularity}</TableCell>
      <TableCell>{song.uri}</TableCell>
      <TableCell>
        {isPlaying ? (
          <IconButton
            color="primary"
            aria-label="play-preview"
            onClick={handlePreviewClick}
          >
            <PauseCircle />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            aria-label="play-preview"
            onClick={handlePreviewClick}
          >
            <PlayCircle />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Song;
