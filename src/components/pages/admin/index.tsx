import { Box, Typography } from "@mui/material";
import { CommonButton, NormalPage, PageHeader } from "../../common";

import LinearProgress from "../../common/LinearProgress";
import { UserTable } from "./UserTable";
import { cc } from "../../../services/cc";
import { root } from "../../../config";
import { routes } from "../../../utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRequireAdmin } from "../../../hooks/use-require-admin";
import { useRouter } from "next/router";
import { useUser } from "../../../hooks/use-user";

const Admin: React.FC = () => {
  useRequireAdmin();
  const { user, isLoading, isAdmin } = useUser();
  const { mutateAsync: createCuratorToken } = useMutation(
    cc.createCuratorToken
  );
  //const [, getNewCuratorToken] = useGetNewCuratorTokenMutation();
  //const [, createPlaylist] = useCreatePlaylist()

  if (isLoading || !user) return <LinearProgress />;

  return (
    <NormalPage>
      <Box width="100%">
        <PageHeader text="Admin" />
        <Typography>The world is yours.</Typography>
        <CommonButton
          text="Create Curator Link"
          sx={{ marginTop: "12px" }}
          onClick={async () => {
            const data = await createCuratorToken();
            console.log("data");
            console.log(data);
            if (data.token) {
              await navigator.clipboard.writeText(
                `${root}${routes.join}?token=${data.token}`
              );
              toast.success("Copied to clipboard.");
            } else {
              toast.error("Unsuccessful.");
            }
          }}
        />
        <CommonButton
          text="Create Playlist"
          sx={{ marginTop: "12px" }}
          //onClick={async () => createPlaylist())}
        />
        <Box width="100%" marginTop="30px">
          <UserTable />
        </Box>
      </Box>
    </NormalPage>
  );
};

export default Admin;
