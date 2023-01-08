import { Checkbox, TableCell, TableRow } from "@mui/material";

import React from "react";
import { UserTableData } from "./types";

interface RowProps {
	user: UserTableData;
	index: number;
	isSelected: (id: string) => boolean;
	handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
}

export const Row: React.FC<RowProps> = ({
	user,
	index,
	isSelected,
	handleClick,
}) => {
	const isItemSelected = isSelected(user.id);
	const labelId = `user-table-checkbox-${index}`;
	return (
		<TableRow
			hover
			onClick={(event) => handleClick(event, user.id)}
			role="checkbox"
			aria-checked={isItemSelected}
			tabIndex={-1}
			selected={isItemSelected}
		>
			<TableCell padding="checkbox">
				<Checkbox
					color="primary"
					checked={isItemSelected}
					inputProps={{
						"aria-labelledby": labelId,
					}}
				/>
			</TableCell>
			<TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
				{new Date(user.createdAt).toLocaleString("en-US", {
					year: "2-digit",
					month: "short",
					day: "2-digit",
					hour: "numeric",
					minute: "2-digit",
				})}
			</TableCell>
			<TableCell align="left">{user.username}</TableCell>
			<TableCell
				component="th"
				id={labelId}
				scope="row"
				sx={{ whiteSpace: "nowrap" }}
			>
				{user.id}
			</TableCell>
			<TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
				{user.spotifyId}
			</TableCell>
			<TableCell align="left">{user.permission}</TableCell>
			<TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
				{user.token}
			</TableCell>
		</TableRow>
	);
};
