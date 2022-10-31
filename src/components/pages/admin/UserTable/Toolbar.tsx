import {
	IconButton,
	Toolbar as MuiToolbar,
	Tooltip,
	Typography,
	alpha,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import KeyIcon from "@mui/icons-material/Key";
import React from "react";

export enum DialogTypes {
	none = "none",
	permissions = "permissions",
}

interface ToolbarProps {
	numSelected: number;
	onActionSelect: (type: DialogTypes) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
	numSelected,
	onActionSelect,
}) => {
	return (
		<MuiToolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Users
				</Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title="Set Permissions">
					<IconButton
						onClick={() => onActionSelect(DialogTypes.permissions)}
					>
						<KeyIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</MuiToolbar>
	);
};
