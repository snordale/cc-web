import * as yup from "yup";

import { Form, Formik } from "formik";
import { Stack, TextField } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const validationSchema = yup.object({
	newPassword: yup.string().min(6, "Minimum 6 characters length").required(),
});

export const SetPasswordForm: React.FC = () => {
	const router = useRouter();

	return (
		<Formik
			initialValues={{ newPassword: "" }}
			validationSchema={validationSchema}
			onSubmit={async (data, { setErrors }) => {
				//const res = await setPassword({
				//	token: router.query.token as string,
				//	newPassword: data.newPassword,
				//});
				//const errors = res.data?.setPassword.errors;
				//if (errors) {
				//	const tokenError = errors.find(
				//		(error) => error.field === "token"
				//	);
				//	toast.error(
				//		tokenError ? "Invalid token." : "Something went wrong."
				//	);
				//	const errorObject: { [key: string]: string } = {};
				//	errors.forEach((error) => {
				//		errorObject[error.field] = error.message;
				//	});
				//	setErrors(errorObject);
				//} else {
				//	toast.error("Password set.");
				//	router.push("/");
				//}
			}}
		>
			{({ isSubmitting, values, handleChange, touched, errors }) => (
				<Form>
					<Stack margin="50px" spacing="18px" width="360px">
						<TextField
							name="newPassword"
							label="New Password"
							type="password"
							value={values.newPassword}
							onChange={handleChange}
							error={
								touched.newPassword &&
								Boolean(errors.newPassword)
							}
							helperText={
								touched.newPassword && errors.newPassword
							}
						/>
						<LoadingButton
							type="submit"
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
	);
};
