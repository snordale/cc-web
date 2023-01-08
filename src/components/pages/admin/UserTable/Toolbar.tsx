import { Box, Dialog, IconButton, MenuItem, Tooltip } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import KeyIcon from "@mui/icons-material/Key";
import { permissions } from "../../../../constants";
import { titleCase } from "title-case";
import { useSetPermissions } from "../../../../services/rq";
import { useState } from "react";

export enum DialogTypes {
  none = "none",
  permissions = "permissions",
}

type Props = {
  selectedUsers: any[];
};

export const Toolbar = ({ selectedUsers }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: setPermissions } = useSetPermissions();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
      <Box display="flex">
        <Tooltip title="Set Permissions">
          <IconButton onClick={handleClickOpen}>
            <KeyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        {Object.keys(permissions).map((permission) => (
          <MenuItem
            value={permission}
            onClick={() =>
              setPermissions({ userIds: selectedUsers, permission })
            }
          >
            {titleCase(permission)}
          </MenuItem>
        ))}
      </Dialog>
    </GridToolbarContainer>
  );
};
