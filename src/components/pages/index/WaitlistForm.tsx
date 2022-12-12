import * as yup from "yup";

import { Box, Button, Fade, Stack, TextField, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";

import { cc } from "../../../services/cc";
import { fontSizes } from "../../../style";
import toast from "react-hot-toast";

const validationSchema = yup.object({
	email: yup.string().required().email(),
});

const JoinLink = () => {
	return (
		<Stack width="100%" spacing={[1.5, 2]} pt={2}>
			<Typography fontSize={fontSizes.formHeader} fontWeight={500}>
				Join Waitlist
			</Typography>

			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (data, { setErrors }) => {
					const res = await cc.joinWaitlist({ ...data });

					if (res.success) {
						toast.success("Joined waitlist.", {
							id: "waitlist",
						});
					} else {
						setErrors(res.errors);
					}
				}}
				validationSchema={validationSchema}
			>
				{({ values, handleChange, touched, errors }) => (
					<FormikForm>
						<Box
							width={["100%", "350px"]}
							display="flex"
							flexDirection={["column", "row"]}
							gap={1}
						>
							<TextField
								name="email"
								label="Email"
								type="email"
								value={values.email}
								onChange={handleChange}
								error={touched.email && Boolean(errors.email)}
								helperText={touched.email && errors.email}
								size="small"
								sx={{ flex: 1 }}
							/>
							<Fade
								in={Boolean(values.email.length)}
								timeout={300}
								easing={{
									enter: "ease-in-out",
									exit: "ease-in-out",
								}}
							>
								<Button variant="contained" size="large">
									<Typography>Join</Typography>
								</Button>
							</Fade>
						</Box>
					</FormikForm>
				)}
			</Formik>
		</Stack>
	);
};

export default JoinLink;