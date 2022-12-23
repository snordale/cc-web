import { Box, Typography } from "@mui/material";

import LinearProgress from "../../common/LinearProgress";
import { NormalPage } from "../../common";
import { logout } from "../../../services/cc";
import { routes } from "../../../utils/routes";
import rq from "../../../services/rq";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export const Logout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isLoading } = useUser();

  useEffect(() => {
    async function helper() {
      const { success } = await logout();

      if (success) {
        await queryClient.invalidateQueries([rq.keys.getCurrentUser]);
        toast.success("Logged out.", {
          id: "logout",
        });
      } else {
        toast.error("Unable to logout.", {
          id: "error",
        });
      }
    }

    helper();
  }, []);

  // If user successfully dumped, redirect
  if (!user && router.isReady) router.push(routes.index);
  // If loading or user still in cache, wait
  if (isLoading || user) return <LinearProgress />;

  return (
    <NormalPage>
      <Box width="100%">
        <Typography>Logging out...</Typography>
      </Box>
    </NormalPage>
  );
};
