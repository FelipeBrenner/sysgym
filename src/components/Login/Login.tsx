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
import { firebaseErrorFormatted } from "@utils";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useIsMounted } from "usehooks-ts";
import * as Yup from "yup";

export const Login = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { t } = useTranslation();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("emailValid"))
        .max(255)
        .required(t("emailRequired")),
      password: Yup.string().max(255).required(t("passwordRequired")),
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
        const message = firebaseErrorFormatted(err);

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
          {t("or")}
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
          label={t("email")}
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
          label={t("password")}
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
        />
        {formik.errors.submit && (
          <Box sx={{ mt: 1 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <LoadingButton
          sx={{ mt: 2 }}
          loading={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {t("login")}
        </LoadingButton>
      </form>
    </>
  );
};
