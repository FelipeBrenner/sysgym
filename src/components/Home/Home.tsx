import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Styles from "./Home.styles";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="md">
      <Styles.Title variant="h4">{t("home.title")}</Styles.Title>
    </Container>
  );
};
