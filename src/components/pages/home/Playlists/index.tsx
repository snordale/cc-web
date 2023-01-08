import { Box, Typography } from "@mui/material";

import Playlist from "./Playlist";
import { fontSizes } from "../../../../style";
import { useGetPlaylists } from "../../../../services/rq";

export const Playlists: React.FC = () => {
  const { data } = useGetPlaylists();
  console.log("data");
  console.log(data);
  const renderPlaylists = (playlists) => {
    return playlists.map((playlist) => (
      <Playlist key={playlist.id} playlist={playlist} />
    ));
  };

  return (
    <Box paddingTop={3}>
      <Typography fontSize={fontSizes.header}>Playlists</Typography>
      <Typography>Check out the works in progress.</Typography>
      <Box>{data && renderPlaylists(data)}</Box>
    </Box>
  );
};
