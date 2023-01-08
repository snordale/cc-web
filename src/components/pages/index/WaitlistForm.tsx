import * as yup from "yup";

import { Box, Fade, Stack, TextField, Typography } from "@mui/material";
import { Formik, Form as FormikForm } from "formik";
import { easing, fontSizes } from "../../../style";

import { LoadingButton } from "@mui/lab";
import { cc } from "../../../services/cc";
import toast from "react-hot-toast";

const validationSchema = yup.object({
  email: yup.string().email(),
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
          console.log("res");
          console.log(res);
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
        {({ values, handleChange, touched, errors, isSubmitting }) => {
          return (
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
                  easing={easing.default}
                >
                  <Box display="flex" alignItems="flex-start">
                    <LoadingButton
                      variant="contained"
                      size="large"
                      type="submit"
                      loading={isSubmitting}
                      sx={{ height: "40px" }}
                      fullWidth
                    >
                      <Typography>Join</Typography>
                    </LoadingButton>
                  </Box>
                </Fade>
              </Box>
            </FormikForm>
          );
        }}
      </Formik>
    </Stack>
  );
};

export default JoinLink;
