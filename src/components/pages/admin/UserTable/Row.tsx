import { Checkbox, TableCell, TableRow } from '@mui/material'

import React from 'react'
import { UserTableData } from '.'

interface RowProps {
	user: UserTableData
	index: number
	isSelected: (id: number) => boolean
	handleClick: (event: React.MouseEvent<unknown>, id: number) => void
}

export const Row: React.FC<RowProps> = ({
	user,
	index,
	isSelected,
	handleClick
}) => {
	const isItemSelected = isSelected(user.id)
	const labelId = `user-table-checkbox-${index}`
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
						'aria-labelledby': labelId,
					}}
				/>
			</TableCell>
			<TableCell
				component="th"
				id={labelId}
				scope="row"
			>
				{user.id}
			</TableCell>
			<TableCell align="right">{user.username}</TableCell>
			<TableCell align="right">{user.spotifyId}</TableCell>
			<TableCell align="right">{(new Date(parseInt(user.createdAt))).toLocaleString("default", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</TableCell>
			<TableCell align="right">{user.permission}</TableCell>
		</TableRow>
	)
}