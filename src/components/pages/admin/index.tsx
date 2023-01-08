import { Box, Button, Typography } from "@mui/material";
import { CommonButton, NormalPage, PageHeader } from "../../common";

import { GridSelectionModel } from "@mui/x-data-grid";
import LinearProgress from "../../common/LinearProgress";
import { LoadingButton } from "@mui/lab";
import { UserTable } from "./UserTable";
import { cc } from "../../../services/cc";
import { root } from "../../../config";
import { routes } from "../../../utils/routes";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRequireAdmin } from "../../../hooks/use-require-admin";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../../hooks/use-user";

const Admin: React.FC = () => {
  useRequireAdmin();
  const { user, isLoading, isAdmin } = useUser();
  const { mutateAsync: createCuratorToken } = useMutation(
    cc.createCuratorToken
  );
  const { mutateAsync: createPlaylist, isLoading: isCreatingPlaylist } =
    useMutation(cc.createPlaylist);

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCreateCuratorLink = async () => {
    const data = await createCuratorToken();

    if (data.token) {
      await navigator.clipboard.writeText(
        `${root}${routes.join}?token=${data.token}`
      );
      toast.success("Copied to clipboard.");
    } else {
      toast.error("Unsuccessful.");
    }
  };

  const handleCreatePlaylist = async () => {
    const data = await createPlaylist({ userIds: selectedUsers });
    console.log("data");
    console.log(data);
    if (data.success) {
      setSelectedUsers([]);
      toast.success("Created 🛠");
    } else {
      toast.error("Unsuccessful.");
    }
  };

  if (isLoading || !user) return <LinearProgress />;

  return (
    <NormalPage>
      <Box width="100%">
        <PageHeader text="Admin" />
        <Typography>The world is yours.</Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ marginTop: "12px" }}
            onClick={handleCreateCuratorLink}
          >
            Create Curator Link
          </Button>
        </Box>
        <Box>
          <LoadingButton
            variant="outlined"
            onClick={handleCreatePlaylist}
            loading={isCreatingPlaylist}
            disabled={!selectedUsers.length}
            sx={{ marginTop: "12px" }}
          >
            Create Playlist
          </LoadingButton>
        </Box>
        <Box width="100%" marginTop="30px">
          <UserTable
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </Box>
      </Box>
    </NormalPage>
  );
};

export default Admin;
