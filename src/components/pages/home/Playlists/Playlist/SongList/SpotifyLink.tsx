import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";

export const SpotifyLink = ({ url, isPlaying, handlePreviewClick }) => {
  return (
    <>
      {isPlaying ? (
        <IconButton
          color="primary"
          aria-label="play-preview"
          onClick={handlePreviewClick}
        >
          <PauseCircleFilledRounded />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          aria-label="play-preview"
          onClick={handlePreviewClick}
          disabled={!url}
        >
          <PlayCircleFilledRounded />
        </IconButton>
      )}
    </>
  );
};
