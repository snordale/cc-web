import { Checkbox, TableCell, TableRow } from '@mui/material'

import React from 'react'
import { UserTableData } from '.'

interface RowProps {
	user: UserTableData
	index: number
	isSelected: (name: string) => boolean
	handleClick: (event: React.MouseEvent<unknown>, name: string) => void
}

export const Row: React.FC<RowProps> = ({
	user,
	index,
	isSelected,
	handleClick
}) => {
	const isItemSelected = isSelected(user.username as string)
	const labelId = `enhanced-table-checkbox-${index}`
	return (
		<TableRow
			hover
			onClick={(event) => handleClick(event, user.username as string)}
			role="checkbox"
			aria-checked={isItemSelected}
			tabIndex={-1}
			key={user.username}
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
			<TableCell align="right">{user.createdAt}</TableCell>
			<TableCell align="right">{user.spotifyId}</TableCell>
			<TableCell align="right">{user.permission}</TableCell>
		</TableRow>
	)
}