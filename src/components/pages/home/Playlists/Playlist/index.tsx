import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SongList } from "./SongList";

const Playlist = ({ playlist }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="playlist-content"
        id="playlist-header"
      >
        <Typography>{playlist.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="column">
          <SongList songs={playlist.songs} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Playlist;
