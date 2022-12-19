import {
	Box,
	Checkbox,
	Dialog,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import { DialogTypes, Toolbar } from "./Toolbar";

import { FaceRetouchingNaturalSharp } from "@mui/icons-material";
import { Row } from "./Row";
import { Spinner } from "../../../global/animations";
import { cc } from "../../../../services/cc";
import { permissions } from "../../../../constants";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useUsers } from "../../../../services/query";
import { visuallyHidden } from "@mui/utils";

export interface UserTableData {
	id: number;
	createdAt: string;
	username: string;
	spotifyId: string;
	permission: string;
	token: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

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

interface HeadCell {
	disablePadding: boolean;
	id: keyof UserTableData;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "createdAt",
		numeric: false,
		disablePadding: false,
		label: "Joined",
	},
	{
		id: "username",
		numeric: false,
		disablePadding: false,
		label: "Username",
	},
	{
		id: "id",
		numeric: false,
		disablePadding: false,
		label: "CC Id",
	},
	{
		id: "spotifyId",
		numeric: false,
		disablePadding: false,
		label: "Spotify ID",
	},
	{
		id: "permission",
		numeric: false,
		disablePadding: false,
		label: "Permission",
	},
	{
		id: "token",
		numeric: false,
		disablePadding: false,
		label: "Token",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof UserTableData
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof UserTableData) =>
		(event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
							sx={{ whiteSpace: "nowrap" }}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc"
										? "sorted descending"
										: "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export function UserTable() {
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof UserTableData>("createdAt");
	const [selected, setSelected] = useState<number[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [dialogType, setDialogType] = useState<DialogTypes>(DialogTypes.none);
	const [openDialog, setOpenDialog] = useState(false);

	const { data, isLoading } = useUsers();
	const { mutateAsync: setUserPermission } = useMutation(
		cc.setUserPermission
	);
	//const [, setUserPermissions] = useSetUserPermissionsMutation();

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
		//const res = await setUserPermissions({ userIds: selected, permission });
		//if (res) {
		//	toast.success("Permissions updated.");
		//}
		//setSelected([]);
		//handleDialogClose();
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

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

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

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<Toolbar
					numSelected={selected.length}
					onActionSelect={onActionSelect}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size="medium"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={users.length}
						/>
						<TableBody>
							{(users as UserTableData[])
								.sort(getComparator(order, orderBy))
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((user, index) => (
									<Row
										key={index}
										user={user}
										index={index}
										isSelected={isSelected}
										handleClick={handleClick}
									/>
								))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={users.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<Dialog open={openDialog} onClose={handleDialogClose}>
				<List sx={{ pt: 0 }}>
					{Object.values(permissions).map((perm) => (
						<ListItem
							button
							onClick={() => onPermissionSelect(perm)}
							key={perm}
						>
							<ListItemText primary={perm} />
						</ListItem>
					))}
				</List>
			</Dialog>
		</Box>
	);
}
