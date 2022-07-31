import * as yup from "yup"

import { Form, Formik } from 'formik'
import { Stack, TextField } from '@mui/material'

import { LoadingButton } from '@mui/lab'
import React from 'react'
import router from "next/router"
import { useSetPasswordMutation } from '../../../generated/graphql'

const validationSchema = yup.object({
	newPassword: yup
		.string()
		.min(6, 'Minimum 6 characters length')
		.required()
})

export const SetPasswordForm: React.FC<{token: string}> = ({ token }) => {
	const [, setPassword] = useSetPasswordMutation()
	return (
		<Formik
			initialValues={{ newPassword: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setErrors }) => {
				console.log("data")
				console.log(data)
				const res = await setPassword({
					token,
					newPassword: data.newPassword
				})
				const errors = res.data?.setPassword.errors

				if (errors) {
					const errorObject: {[key: string]: string} = {}
					errors.forEach(error => {
						errorObject[error.field] = error.message
					})
					setErrors(errorObject)
				}
				else {
					router.push("/")
				}
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
							name='newPassword'
							label='New Password'
							type='password'
							value={values.newPassword}
							onChange={handleChange}
							error={touched.newPassword && Boolean(errors.newPassword)}
							helperText={touched.newPassword && errors.newPassword}
						/>
						<LoadingButton
							type='submit'
							variant="contained"
							loading={isSubmitting}
							fullWidth
						>
							Set Password
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}