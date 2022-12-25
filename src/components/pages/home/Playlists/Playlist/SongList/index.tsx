import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Link } from "../../../../../common";
import NextLink from "next/link";
import PlayButton from "@mui/icons-material/PlayCircle";
import Song from "./Song";

export const SongList = ({ songs }) => {
  return songs.map((song, index) => (
    //<Box width="100%" display="flex" gap={2}>
    //  <Typography>
    //    {index}. {song.name}
    //  </Typography>
    //  <Link href={song.uri} text="Link" />
    //</Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="song-table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artists</TableCell>
            <TableCell align="right">Popularity</TableCell>
            <TableCell>Preview</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <Song song={song} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ));
};
