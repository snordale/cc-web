import * as yup from "yup";

import { Box, Stack, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";

import { Link } from "../src/components/common/Link";
import LoadingButton from "@mui/lab/LoadingButton";
import NextLink from "next/link";
import { NormalPage } from "../src/components/common/NormalPage";
import React from "react";
import { cc } from "../src/services/cc";
import { fontSizes } from "../src/style";
import toast from "react-hot-toast";
import { useIsLoggedIn } from "../src/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const validationSchema = yup.object({
	usernameOrEmail: yup
		.string()
		.min(3, "Minimum 3 characters length")
		.required(),
	password: yup.string().min(6, "Minimum 6 characters length").required(),
});

const Login: React.FC = () => {
	useIsLoggedIn();
	const router = useRouter();

	const { mutateAsync: login } = useMutation(cc.login);

	return (
		<NormalPage>
			<Stack spacing={3} alignItems="center">
				<Typography fontSize={fontSizes.header}>Login</Typography>
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
					{({
						isSubmitting,
						values,
						handleChange,
						touched,
						errors,
					}) => (
						<Form>
							<Stack spacing="18px" width="240px">
								<TextField
									name="usernameOrEmail"
									label="Username or email"
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
									error={
										touched.password &&
										Boolean(errors.password)
									}
									helperText={
										touched.password && errors.password
									}
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
				<Box display="flex">
					<Link
						text="Forgot Password?"
						href="/reset-password"
						fontSize={fontSizes.small}
					/>
				</Box>
			</Stack>
		</NormalPage>
	);
};

export default Login;
