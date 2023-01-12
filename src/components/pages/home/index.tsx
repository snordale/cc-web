import { Box, Typography } from "@mui/material";

import LinearProgress from "../../common/LinearProgress";
import { NormalPage } from "../../common/NormalPage";
import { Playlists } from "./Playlists";
import { fontSizes } from "../../../style";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Home: React.FC = () => {
  const router = useRouter();

  const { user, isLoading, isContributor, isNotUser } = useUser();

  if (isNotUser) router.replace(`/login?next=${router.pathname}`);
  if (isLoading || !user) return <LinearProgress />;

  return (
    <NormalPage>
      <Box display="flex" width="100%" flexDirection="column">
        <Typography fontSize={fontSizes.header}>
          Welcome {user.username}.
        </Typography>
        <Playlists />
      </Box>
    </NormalPage>
  );
};
