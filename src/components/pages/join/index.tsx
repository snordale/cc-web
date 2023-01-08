import { Box, Stack } from "@mui/material";

import CenteredForm from "../../common/CenteredForm";
import { Header } from "./Header";
import Image from "next/image";
import { JoinForm } from "./JoinForm";
import LinearProgress from "../../common/LinearProgress";
import { NormalPage } from "../../common/NormalPage";
import { routes } from "../../../utils/routes";
import twentyFive from "../../../../public/twenty-five.png";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

export * from "./Header";
export * from "./JoinForm";

export const Join = () => {
  const router = useRouter();

  const { user, isLoading } = useUser();

  if (router.isReady && user)
    router.push(
      router.query.next ? (router.query.next as string) : routes.home
    );
  if (isLoading || user) return <LinearProgress />;

  const curatorToken = router.query.token ? (router.query.token as string) : "";

  return (
    <NormalPage>
      <CenteredForm>
        <Box position="relative" width="60px" minHeight="50px">
          <Image
            src={twentyFive}
            alt="Drawing of music sharing website."
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
        <Header curatorToken={curatorToken} />
        <JoinForm curatorToken={curatorToken} />
      </CenteredForm>
    </NormalPage>
  );
};
