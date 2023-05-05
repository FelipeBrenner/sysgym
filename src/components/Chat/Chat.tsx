import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as Styles from "./Chat.styles";

export const Chat = () => {
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="md">
      <Styles.Title variant="h4">{t("chat.title")}</Styles.Title>
    </Container>
  );
};
