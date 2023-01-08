import { Avatar, Stack, Typography } from "@mui/material";
import { CommonButton, PageHeader } from "../src/components/common";
import React, { useMemo } from "react";
import {
  curatorRequiredScopes,
  permissions,
  requiredScopes,
  signatureGradientLight,
} from "../src/constants";
import { green, red } from "@mui/material/colors";
import { useGetBasicAuthLink, useGetCuratorAuthLink } from "../src/services/rq";

import LinearProgress from "../src/components/common/LinearProgress";
import { NormalPage } from "../src/components/common/NormalPage";
import toast from "react-hot-toast";
import { useRequireLogin } from "../src/hooks";
import { useRouter } from "next/router";
import { useUser } from "../src/hooks/use-user";

const Account: React.FC = () => {
  useRequireLogin();

  const router = useRouter();

  const { user, isLoading, isCurator, isAdmin } = useUser();

  const { mutateAsync: getBasicAuthLink } = useGetBasicAuthLink();
  const { mutateAsync: getCuratorAuthLink } = useGetCuratorAuthLink();

  const hasRequiredScope = useMemo(() => {
    if (user && user.spotifyScopes) {
      const hasBasicScope = requiredScopes.every((rqd) =>
        user.spotifyScopes.includes(rqd as string)
      );

      if (!isCurator && !isAdmin) return hasBasicScope;

      return curatorRequiredScopes.every((rqd) =>
        user.spotifyScopes.includes(rqd)
      );
    }
    return false;
  }, [user]);

  const handleSpotifyConnect = async () => {
    const data =
      isCurator || isAdmin
        ? await getCuratorAuthLink()
        : await getBasicAuthLink();

    if (data.link) {
      router.replace(data.link);
    } else {
      toast.error("Something went wrong.", { id: "error" });
    }
  };

  const getAccountType = () => {
    if (!user) return "";

    switch (user.permission) {
      case permissions.none:
        return "Non-member";
      case permissions.tier1:
        return "Tier 1";
      case permissions.tier2:
        return "Tier 2";
      case permissions.curator:
        return "Curator";
      case permissions.admin:
        return "Admin";
      case permissions.god:
        return "God";
    }
  };

  if (isLoading || !user) return <LinearProgress />;

  return (
    <NormalPage>
      <Stack width="100%" spacing="12px">
        <PageHeader text="Account" />
        <Avatar
          src={user.profilePhoto ?? ""}
          sx={{
            background: signatureGradientLight,
            color: "black",
          }}
        >
          {user.username.slice(0, 1)}
        </Avatar>
        <Typography fontSize="18px" fontWeight="600">
          {user.username}
        </Typography>
        <Typography fontSize="14px" fontWeight="600">
          Account Type
        </Typography>
        <Typography>{getAccountType()}</Typography>
        <Stack paddingBottom="18px" spacing="12px">
          <Stack direction="row" spacing="6px">
            <Typography fontSize="14px" fontWeight="600">
              Spotify Link
            </Typography>
          </Stack>
          <Typography color={hasRequiredScope ? green[900] : red[900]}>
            {hasRequiredScope ? "Authenticated" : "Not Authenticated"}
          </Typography>
          <CommonButton text={"Authenticate"} onClick={handleSpotifyConnect} />
        </Stack>
      </Stack>
    </NormalPage>
  );
};

export default Account;
