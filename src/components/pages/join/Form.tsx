import * as yup from "yup";

import { Formik, Form as FormikForm } from "formik";
import { Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import React from "react";
import router from "next/router";
import toast from "react-hot-toast";
import { useCreateUserMutation } from "../../../generated/graphql";

const validationSchema = yup.object({
	email: yup.string().required().email(),
	username: yup.string().min(3, "Minimum 3 characters length").required(),
	password: yup.string().min(6, "Minimum 6 characters length").required(),
});

interface FormProps {
	curatorToken: string;
}

export const Form: React.FC<FormProps> = ({ curatorToken }) => {
	const [, createUser] = useCreateUserMutation();

	return (
		<Formik
			initialValues={{
				email: "",
				username: "",
				password: "",
			}}
			onSubmit={async (data, { setErrors }) => {
				const res = await createUser({
					...data,
					token: curatorToken,
				});

				const errors = res.data?.createUser.errors;

				if (errors) {
					const errorObject: { [key: string]: string } = {};
					errors.forEach((error) => {
						errorObject[error.field] = error.message;
					});
					setErrors(errorObject);
					if (errorObject.token) toast.error(errorObject.token);
				} else {
					toast.success(
						`Welcome ${res.data?.createUser.user?.username}`,
						{ id: "welcome" }
					);
					router.push("/");
				}
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, values, handleChange, touched, errors }) => (
				<FormikForm>
					<Stack spacing="18px" width="360px">
						<TextField
							name="email"
							label="Email"
							type="email"
							value={values.email}
							onChange={handleChange}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>
						<TextField
							name="username"
							label="Username"
							value={values.username}
							onChange={handleChange}
							error={touched.username && Boolean(errors.username)}
							helperText={touched.username && errors.username}
						/>
						<TextField
							name="password"
							label="Password"
							type="password"
							value={values.password}
							onChange={handleChange}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
						/>
						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							fullWidth
						>
							Join
						</LoadingButton>
					</Stack>
				</FormikForm>
			)}
		</Formik>
	);
};
