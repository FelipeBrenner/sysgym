import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Styles from "./Schedule.styles";

export const Schedule = () => {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="md">
      <Styles.Title variant="h4">{t("schedule.title")}</Styles.Title>
    </Container>
  );
};
