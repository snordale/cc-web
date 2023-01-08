import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Song } from "./Song";
import { useState } from "react";

export const SongList = ({ songs }) => {
  const [songPlaying, setSongPlaying] = useState<any>(null);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="song-table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artists</TableCell>
            <TableCell>Length</TableCell>
            <TableCell align="right">Popularity</TableCell>
            <TableCell>Preview</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <Song
              key={song.isrc}
              song={song}
              index={index}
              songPlaying={songPlaying}
              setSongPlaying={setSongPlaying}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
