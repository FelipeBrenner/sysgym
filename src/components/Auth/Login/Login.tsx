import { useAuth } from "@hooks";
import { firebaseErrorFormatted } from "@utils";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useIsMounted } from "usehooks-ts";
import * as Yup from "yup";
import { Form } from "../Form";

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
    <Form
      formik={formik}
      handleGoogleClick={handleGoogleClick}
      submitText={t("login")}
    />
  );
};
