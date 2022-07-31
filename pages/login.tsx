import * as yup from 'yup';

import { Form, Formik } from 'formik'
import { Stack, TextField } from '@mui/material'
import { useLoginMutation, useSendPasswordResetMutation } from '../src/generated/graphql';

import Link from 'next/link';
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { createUrqlClient } from '../src/utils/createUrqlClient';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';

const validationSchema = yup.object({
	emailOrUsername: yup
		.string()
		.min(3, 'Minimum 3 characters length')
		.required(),
	password: yup
		.string()
		.min(6, 'Minimum 6 characters length')
		.required()
})

const Login: React.FC<{}> = ({}) => {
	const router = useRouter()

	const [, login] = useLoginMutation()
	const [, sendPasswordReset] = useSendPasswordResetMutation()

	return (
		<Formik
			initialValues={{ emailOrUsername: "", password: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setErrors }) => {
				const res = await login(data)
				console.log(res)
				const errors = res.data?.login.errors

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
							name='emailOrUsername'
							label='Username or email'
							value={values.emailOrUsername}
							onChange={handleChange}
							error={touched.emailOrUsername && Boolean(errors.emailOrUsername)}
							helperText={touched.emailOrUsername && errors.emailOrUsername}
						/>
						<TextField
							name='password'
							label='Password'
							type='password'
							value={values.password}
							onChange={handleChange}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
						/>
						<LoadingButton
							type='submit'
							variant="contained"
							loading={isSubmitting}
							fullWidth
						>
							Login
						</LoadingButton>
						<Link href="/reset-password">
							<LoadingButton
								variant="contained"
								loading={isSubmitting}
								fullWidth
							>
								Reset Password
							</LoadingButton>
						</Link>
					</Stack>
				</Form>
			)}
		</Formik>
	)
}

export default withUrqlClient(createUrqlClient)(Login)