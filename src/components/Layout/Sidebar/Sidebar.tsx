import { Scrollbar } from "@components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import type { Theme } from "@mui/material";
import { Drawer, useMediaQuery } from "@mui/material";
import { TFunction } from "i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import * as Styles from "./Sidebar.styles";

interface SidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t("general"),
    items: [
      {
        title: t("home.title"),
        path: "/",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("schedule.title"),
        path: "/schedule",
        icon: <CalendarMonthIcon fontSize="small" />,
      },
      {
        title: t("chat.title"),
        path: "/chat",
        icon: <ForumIcon fontSize="small" />,
      },
    ],
  },
  {
    title: t("personal"),
    items: [
      {
        title: t("profile.title"),
        path: "/profile",
        icon: <AccountCircleIcon fontSize="small" />,
      },
      {
        title: t("assessments.title"),
        path: "/assessments",
        icon: <AssessmentIcon fontSize="small" />,
      },
    ],
  },
];

export const Sidebar = ({ onClose, open }: SidebarProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange, [router.isReady, router.asPath]);

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
      }}
    >
      <Styles.LogoBox component={NextLink} href="/">
        <Styles.Logo />
      </Styles.LogoBox>
      {sections.map((section) => (
        <Styles.SidebarSection
          key={section.title}
          path={router.asPath}
          sx={{
            mt: 2,
            "& + &": {
              mt: 2,
            },
          }}
          {...section}
        />
      ))}
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
