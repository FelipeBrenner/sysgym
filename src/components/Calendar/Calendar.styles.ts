import { Card as MuiCard, Typography, alpha, styled } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const Card = styled(MuiCard)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const FullCalendarWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(2),
  "& .fc-license-message": {
    display: "none",
  },
  "& .fc": {
    "--fc-bg-event-opacity": 1,
    "--fc-border-color": theme.palette.divider,
    "--fc-daygrid-event-dot-width": "10px",
    "--fc-event-text-color": theme.palette.primary.contrastText,
    "--fc-list-event-hover-bg-color": theme.palette.background.default,
    "--fc-neutral-bg-color": theme.palette.background.default,
    "--fc-page-bg-color": theme.palette.background.default,
    "--fc-today-bg-color": alpha(theme.palette.primary.main, 0.25),
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
  "& .fc .fc-col-header-cell-cushion": {
    paddingBottom: "10px",
    paddingTop: "10px",
    fontSize: theme.typography.overline.fontSize,
    fontWeight: theme.typography.overline.fontWeight,
    letterSpacing: theme.typography.overline.letterSpacing,
    lineHeight: theme.typography.overline.lineHeight,
    textTransform: theme.typography.overline.textTransform,
  },
  "& .fc .fc-day-other .fc-daygrid-day-top": {
    color: theme.palette.text.secondary,
  },
  "& .fc-daygrid-event": {
    borderRadius: theme.shape.borderRadius,
    padding: "0px 4px",
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    lineHeight: theme.typography.subtitle2.lineHeight,
  },
  "& .fc-daygrid-block-event .fc-event-time": {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
  },
  "& .fc-daygrid-day-frame": {
    padding: "12px",
  },
}));
