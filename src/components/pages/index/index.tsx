import { Box, Button, Stack, Typography } from "@mui/material";
import { isPrerelease, root } from "../../../config";

import Image from "next/image";
import JoinLink from "./JoinLink";
import { NormalPage } from "../../common/NormalPage";
import WaitlistForm from "./WaitlistForm";
import { cc } from "../../../services/cc";
import { fontSizes } from "../../../style";
import graphic from "../../../../public/graphic.png";
import { routes } from "../../../utils/routes";
import second from "../../../../public/selected.png";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const photoSize = ["200px", "300px", "350px"];

export const Index = () => {
  const router = useRouter();

  const { isAuthenticated } = useUser();
  const createCuratorToken: () => Promise<{ token: string }> = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ token: "swag" });
      }, 300);
    });

  if (isAuthenticated) router.push("/home");

  return (
    <NormalPage>
      <Button
        onClick={async () => {
          createCuratorToken().then(async (data) => {
            console.log(data);
            if (data.token) {
              await navigator.clipboard.writeText(
                `${root}${routes.join}?token=${data.token}`
              );
              toast.success("Copied to clipboard.");
            } else {
              toast.error("Unsuccessful.");
            }
          });
        }}
      >
        button
      </Button>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        paddingY={[0, 4]}
        gap={[6, 18]}
      >
        <Box
          width="100%"
          display="flex"
          gap={3}
          flexDirection={["column", "row"]}
        >
          <Stack flex={1} spacing={1}>
            <Typography fontSize={fontSizes.indexHeader}>
              Weekly playlist for people who know what's worth listening to.
            </Typography>
            <Typography fontSize={fontSizes.indexSubheader} color="grey.700">
              Discover new music selected from the listening data of the top
              culture-makers.
            </Typography>
            {isPrerelease ? <WaitlistForm /> : <JoinLink />}
          </Stack>
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={[2, 0]}
          >
            <Box position="relative" width="100%">
              <Image
                src={graphic}
                alt="Drawing of music sharing website."
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          gap={3}
          flexDirection={["column-reverse", "row"]}
          alignItems="center"
        >
          <Box
            flex={1}
            position="relative"
            minWidth={photoSize}
            minHeight={photoSize}
          >
            <Image
              src={second}
              alt="Drawing of music sharing website."
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack width="100%" spacing={2} flex={1}>
            <Typography fontSize={24}>
              Welcome to our music sharing platform.
            </Typography>
            <Typography fontSize={16}>
              We're excited to introduce you to a unique way of discovering new
              music. Our platform uses artificial intelligence to create weekly
              playlists based on the listening data of a group of hand-selected
              curators.
            </Typography>
            <Typography fontSize={16}>
              This means that you get personalized recommendations based on the
              music tastes of experts in the field. Not only do our AI-powered
              playlists provide you with a diverse selection of songs, but they
              also help you stay up-to-date with the latest releases from your
              favorite artists.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </NormalPage>
  );
};
