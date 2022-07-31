import * as yup from "yup"

import { Form, Formik } from 'formik'
import { Stack, TextField } from '@mui/material'

import { LoadingButton } from '@mui/lab'
import React from 'react'
import { useSendPasswordResetMutation } from '../../../generated/graphql'

const validationSchema = yup.object({
email: yup
	.string()
	.min(6, 'Minimum 6 characters length')
	.required()
})

export const SendResetForm: React.FC<{}> = ({ }) => {
	const [, sendPasswordReset] = useSendPasswordResetMutation()
	return (
		<Formik
			initialValues={{ email: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setErrors }) => {
				console.log("data")
				console.log(data)
				const res = await sendPasswordReset({ ...data })

				// is sent --- TODO validate email on backend
			}}
		>
			{({
				isSubmitting,
				values,
				handleChange,
				touched,
				errors
			}) => (
				<Form>
					<Stack
						margin='50px'
						spacing='18px'
						width='360px'
					>
						<TextField
							name='email'
							label='Email'
							type='email'
							value={values.email}
							onChange={handleChange}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>
						<LoadingButton
							type='submit'
							variant="contained"
							loading={isSubmitting}
							fullWidth
						>
							Send Reset Link
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}