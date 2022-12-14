import * as yup from "yup";

import { Form, Formik } from "formik";
import { Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import React from "react";
import { login } from "../../../services/cc";
import router from "next/router";
import toast from "react-hot-toast";

const validationSchema = yup.object({
	usernameOrEmail: yup
		.string()
		.min(3, "Minimum 3 characters length")
		.required(),
	password: yup.string().min(6, "Minimum 6 characters length").required(),
});

export const LoginForm: React.FC = () => {
	return (
		<Formik
			initialValues={{ usernameOrEmail: "", password: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setErrors }) => {
				const res = await login({
					usernameOrEmail: data.usernameOrEmail,
					password: data.password,
				});

				if (res.user) {
					if (router.query.next) {
						router.push(router.query.next as string);
					} else {
						router.push("/home");
					}
					toast.success(`Welcome ${res.user.username}`, {
						id: "welcome",
					});
				} else {
					setErrors(res.errors);
				}
			}}
		>
			{({ isSubmitting, values, handleChange, touched, errors }) => (
				<Form>
					<Stack spacing="18px" width="240px">
						<TextField
							name="usernameOrEmail"
							label="Username or Email"
							value={values.usernameOrEmail}
							onChange={handleChange}
							error={
								touched.usernameOrEmail &&
								Boolean(errors.usernameOrEmail)
							}
							helperText={
								touched.usernameOrEmail &&
								errors.usernameOrEmail
							}
							size="small"
						/>
						<TextField
							name="password"
							label="Password"
							type="password"
							value={values.password}
							onChange={handleChange}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
							size="small"
						/>
						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							fullWidth
						>
							Login
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};
