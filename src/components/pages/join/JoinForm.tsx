import * as yup from "yup";

import { Box, Stack, TextField } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

import { LoadingButton } from "@mui/lab";
import React from "react";
import { cc } from "../../../services/cc";
import router from "next/router";
import toast from "react-hot-toast";

const validationSchema = yup.object({
	email: yup.string().required().email(),
	username: yup.string().min(3, "Minimum 3 characters length").required(),
	password: yup.string().min(6, "Minimum 6 characters length").required(),
});

interface FormProps {
	curatorToken: string;
}

export const JoinForm: React.FC<FormProps> = ({ curatorToken }) => {
	return (
		<Formik
			initialValues={{
				email: "",
				username: "",
				password: "",
			}}
			onSubmit={async (data, { setErrors }) => {
				const res = await cc.join({ ...data, token: curatorToken });
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
					setErrors(res);
				}
			}}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, values, handleChange, touched, errors }) => (
				<FormikForm>
					<Stack spacing="18px" width="240px">
						<TextField
							name="email"
							label="Email"
							type="email"
							value={values.email}
							onChange={handleChange}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
							size="small"
						/>
						<TextField
							name="username"
							label="Username"
							value={values.username}
							onChange={handleChange}
							error={touched.username && Boolean(errors.username)}
							helperText={touched.username && errors.username}
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
						<Box display="flex">
							<LoadingButton
								type="submit"
								variant="contained"
								loading={isSubmitting}
								fullWidth
							>
								Join
							</LoadingButton>
						</Box>
					</Stack>
				</FormikForm>
			)}
		</Formik>
	);
};
