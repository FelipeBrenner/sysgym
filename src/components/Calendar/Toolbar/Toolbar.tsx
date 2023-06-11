import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import moment from "moment";
import "moment/locale/pt-br";
import { FC, ReactNode } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface Props {
  children?: ReactNode;
  date: Date;
  onAddClick: () => void;
  onDateNext: () => void;
  onDatePrev: () => void;
  onDateToday: () => void;
}

export const Toolbar: FC<Props> = ({
  date,
  onAddClick,
  onDateNext,
  onDatePrev,
  onDateToday,
  ...other
}) => {
  const month = moment(date).locale("pt-br").format("MMMM");

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        pt: 3,
        px: 3,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mb: {
            xs: 2,
            md: 0,
          },
          mr: 2,
        }}
      >
        <Typography variant="h3" color="textPrimary">
          {month.charAt(0).toUpperCase() + month.slice(1)}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            ml: 1,
          }}
          variant="h3"
          color="textPrimary"
        >
          {format(date, "y")}
        </Typography>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          display: "flex",
          m: -1,
        }}
      >
        <Box sx={{ m: 1 }}>
          <IconButton onClick={onDatePrev}>
            <KeyboardArrowLeft fontSize="small" />
          </IconButton>
          <Button variant="text" size="small" onClick={onDateToday}>
            Hoje
          </Button>
          <IconButton onClick={onDateNext}>
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        </Box>
        <Button
          onClick={onAddClick}
          startIcon={<AddIcon fontSize="small" />}
          sx={{
            m: 1,
            order: {
              xs: -1,
              md: 0,
            },
            width: {
              xs: "100%",
              md: "auto",
            },
          }}
          variant="contained"
        >
          Nova Atividade
        </Button>
      </Box>
    </Box>
  );
};
