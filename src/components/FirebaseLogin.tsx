import { useAuth } from "@hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { formatFirebaseError } from "@utils";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useIsMounted } from "usehooks-ts";
import * as Yup from "yup";

export const FirebaseLogin = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123!",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);

        if (isMounted()) {
          const returnUrl =
            (router.query.returnUrl as string | undefined) || "/";
          router.push(returnUrl).catch(console.error);
        }
      } catch (err: any) {
        const message = formatFirebaseError(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const handleGoogleClick = async (): Promise<void> => {
    try {
      await signInWithGoogle();

      if (isMounted()) {
        const returnUrl = (router.query.returnUrl as string | undefined) || "/";
        router.push(returnUrl).catch(console.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        sx={{
          backgroundColor: "common.white",
          color: "common.black",
          "&:hover": {
            backgroundColor: "common.white",
            color: "common.black",
          },
        }}
        variant="contained"
      >
        <Box
          alt="Google"
          component="img"
          src="/static/icons/google.svg"
          sx={{ mr: 1 }}
        />
        Google
      </Button>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
        <Typography color="textSecondary" sx={{ m: 2 }} variant="body1">
          OR
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <LoadingButton
            loading={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};