import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Styles from "./Assessments.styles";

export const Assessments = () => {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="md">
      <Styles.Title variant="h4">{t("assessments.title")}</Styles.Title>
    </Container>
  );
};
