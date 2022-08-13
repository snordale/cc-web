import * as yup from 'yup'

import { Form, Formik } from 'formik'
import { Stack, TextField } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import { NormalPage } from '../src/components/global/NormalPage';
import { createUrqlClient } from '../src/utils/createUrqlClient';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '../src/generated/graphql';
import { useMemo } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';

const validationSchema = yup.object({
	email: yup
		.string()
		.required()
		.email(),
	username: yup
		.string()
		.min(3, 'Minimum 3 characters length')
		.required(),
	password: yup
		.string()
		.min(6, 'Minimum 6 characters length')
		.required()
})

const Join = ({ }) => {
	const router = useRouter()
	console.log("router.query")
	console.log(router.query)

	const [, createUser] = useCreateUserMutation()

	const curatorToken = router.query.token ? router.query.token as string : ""

	return (
		<NormalPage>
			<Formik
				initialValues={{
					email: "",
					username: "",
					password: ""
				}}
				onSubmit={async (data, { setErrors }) => {
					const res = await createUser({
						...data,
						token: curatorToken
					})

					const errors = res.data?.createUser.errors

					if (errors) {
						const errorObject: {[key: string]: string} = {}
						errors.forEach(error => {
							errorObject[error.field] = error.message
						})
						setErrors(errorObject)
						if (errorObject.token) toast.error(errorObject.token)
					}
					else {
						toast.success(`Welcome ${res.data?.createUser.user?.username}`, { id: "welcome" })
						router.push("/")
					}
				}}
				validationSchema={validationSchema}
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
							<TextField
								name='username'
								label='Username'
								value={values.username}
								onChange={handleChange}
								error={touched.username && Boolean(errors.username)}
								helperText={touched.username && errors.username}
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
								Join
							</LoadingButton>
						</Stack>
					</Form>
				)}
			</Formik>
		</NormalPage>
	)
}

export default withUrqlClient(createUrqlClient)(Join)