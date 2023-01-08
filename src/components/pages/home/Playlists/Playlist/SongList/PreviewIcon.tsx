import { Box, IconButton, Tooltip } from "@mui/material";
import {
  PauseCircleFilledRounded,
  PlayCircleFilledRounded,
} from "@mui/icons-material";

export const PreviewIcon = ({ url, isPlaying, handlePreviewClick }) => {
  return (
    <Box display="flex" justifyContent="center">
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
    </Box>
  );
};
