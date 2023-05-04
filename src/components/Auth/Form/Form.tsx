import { Divider, TextField } from "@mui/material";
import { FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import * as Styles from "./Form.styles";

interface FormProps {
  formik: FormikValues;
  handleGoogleClick: () => Promise<void>;
  submitText: string;
}

export const Form = ({ formik, handleGoogleClick, submitText }: FormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Styles.GoogleButton
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="contained"
      >
        <Styles.GoogleIcon alt="Google" src="/static/icons/google.svg" />
        Google
      </Styles.GoogleButton>
      <Styles.DividerBox>
        <Styles.FlexGrowBox>
          <Divider orientation="horizontal" />
        </Styles.FlexGrowBox>
        <Styles.DividerText variant="body1">{t("or")}</Styles.DividerText>
        <Styles.FlexGrowBox>
          <Divider orientation="horizontal" />
        </Styles.FlexGrowBox>
      </Styles.DividerBox>
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
          <Styles.SubmitError error>{formik.errors.submit}</Styles.SubmitError>
        )}
        <Styles.SubmitButton
          loading={formik.isSubmitting}
          size="large"
          type="submit"
          variant="contained"
        >
          {submitText}
        </Styles.SubmitButton>
      </form>
    </>
  );
};
