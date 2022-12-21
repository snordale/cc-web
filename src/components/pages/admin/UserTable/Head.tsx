import {
	Box,
	Checkbox,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import { EnhancedTableProps, HeadCell, UserTableData } from "./types";

import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { visuallyHidden } from "@mui/utils";

export const headCells: GridColDef[] = [
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

const Head = (props: EnhancedTableProps) => {
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
};

export default Head;
