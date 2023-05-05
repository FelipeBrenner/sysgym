import { Container, Tab, Tabs } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Styles from "./Profile.styles";
import { ProfileGeneral } from "./ProfileGeneral";

export const Profile = () => {
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>("general");

  const tabs = [{ label: t("general"), value: "general" }];

  const handleTabsChange = (_: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Styles.Title variant="h4">{t("profile.title")}</Styles.Title>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Styles.Divider />
      {currentTab === "general" && <ProfileGeneral />}
    </Container>
  );
};
