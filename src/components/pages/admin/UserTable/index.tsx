import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Order, UserTableData } from "./types";
import { useSetPermissions, useUsers } from "../../../../services/rq";

import { Box } from "@mui/material";
import { DialogTypes } from "./Toolbar";
import { Spinner } from "../../../global/animations";
import { titleCase } from "title-case";
import toast from "react-hot-toast";
import { useState } from "react";

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

export function UserTable() {
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof UserTableData>("createdAt");
	const [selected, setSelected] = useState<string[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [dialogType, setDialogType] = useState<DialogTypes>(DialogTypes.none);
	const [openDialog, setOpenDialog] = useState(false);

	const { data } = useUsers();
	const { mutateAsync: setPermissions } = useSetPermissions();

	if (!data) return <Spinner />;

	const users = data.users;

	const handleDialogClose = () => {
		setDialogType(DialogTypes.none);
		setOpenDialog(false);
	};

	const onActionSelect = (type: DialogTypes) => {
		setDialogType(type);
		setOpenDialog(true);
	};

	const onPermissionSelect = async (permission: string) => {
		const res = await setPermissions({ userIds: selected, permission });

		if (res) toast.success("Permissions updated.");

		setSelected([]);
		handleDialogClose();
	};

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof UserTableData
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelected = users.map((user: any) => user.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id: string) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	return (
		<Box sx={{ height: 400, width: "100%" }}>
			<Box style={{ flexGrow: 1, height: "100%" }}>
				<DataGrid
					rows={users}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					disableSelectionOnClick
					experimentalFeatures={{ newEditingApi: true }}
					components={{ Toolbar: GridToolbar }}
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
