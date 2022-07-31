import { FormControl, Input, InputLabel } from '@mui/material'
import React, { InputHTMLAttributes } from 'react'

import { useField } from "formik"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
}

export const InputField: React.FC<InputFieldProps> = (props) => {
	const [field, { error }] = useField(props)
	return (
		<FormControl error={error !== ""}>
			<InputLabel htmlFor={props.name} required>{props.label}</InputLabel>
			<Input id={props.name} aria-describedby={props.label}/>
		</FormControl>
	)
}