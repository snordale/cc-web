import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSetPermissions, useUsers } from "../../../../services/rq";

import { Box } from "@mui/material";
import { Order } from "./types";
import { Spinner } from "../../../global/animations";
import { Toolbar } from "./Toolbar";
import { titleCase } from "title-case";

const columns = [
  {
    field: "createdAt",
    headerName: "Joined",
    width: 150,
    valueParser: (params) => new Date(params.value),
    valueFormatter: (params) =>
      new Date(params.value).toLocaleString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
      }),
  },
  {
    field: "username",
    headerName: "Username",
  },
  {
    field: "permission",
    headerName: "Permission",
    valueFormatter: (params) => titleCase(params.value),
  },
  {
    field: "id",
    headerName: "CC Id",
    width: 250,
  },
  {
    field: "token",
    headerName: "Token",
    width: 250,
  },
  {
    field: "spotifyId",
    headerName: "Spotify Id",
    width: 200,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function UserTable({ selectedUsers, setSelectedUsers }) {
  const { data } = useUsers();

  //const [selectedUsers, setSelectedUsers] = useState<GridSelectionModel>([]);

  if (!data) return <Spinner />;

  if (data.error) return null;

  const users = data.users;

  //const handleSetPermissions = async () => {
  //  const res = await setPermissions({userIds: selectedUsers, permission})
  //}

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box style={{ flexGrow: 1, height: "100%" }}>
        <DataGrid
          onSelectionModelChange={setSelectedUsers}
          selectionModel={selectedUsers}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: () => <Toolbar selectedUsers={selectedUsers} />,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "createdAt", sort: "asc" }],
            },
          }}
        />
      </Box>
    </Box>
  );
}
