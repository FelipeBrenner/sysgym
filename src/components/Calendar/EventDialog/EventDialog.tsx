import { eventsDatabase } from "@database";
import { useAuth } from "@hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ICalendarEvent } from "@types";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useFormik } from "formik";
import { FC, ReactNode, useMemo } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

interface Props {
  event?: ICalendarEvent;
  onAddComplete?: () => void;
  onClose?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  open?: boolean;
  range?: { start: number; end: number };
}

interface FormValues {
  allDay: boolean;
  color: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
  submit: string | null;
}

export const EventDialog: FC<Props> = ({
  event,
  onAddComplete,
  onClose,
  onDeleteComplete,
  onEditComplete,
  open,
  range,
}) => {
  const { user } = useAuth();

  const initialValues = useMemo((): FormValues => {
    if (event) {
      return {
        allDay: event.allDay,
        color: event.color ?? "",
        description: event.description,
        end: new Date(event.end),
        start: new Date(event.start),
        title: event.title,
        submit: null,
      };
    }

    if (range) {
      return {
        allDay: false,
        color: "",
        description: "",
        end: new Date(range.end),
        start: new Date(range.start),
        title: "",
        submit: null,
      };
    }

    const start = new Date();
    start.setMinutes(0);
    start.setHours(start.getHours() + 1);
    const end = new Date();
    end.setMinutes(0);
    end.setHours(end.getHours() + 2);

    return {
      allDay: false,
      color: "",
      description: "",
      end,
      start,
      title: "",
      submit: null,
    };
  }, [event, range]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      allDay: Yup.bool(),
      description: Yup.string().max(5000),
      end: Yup.date(),
      start: Yup.date(),
      title: Yup.string().max(255).required("Título é obrigatório"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        let data = {
          allDay: values.allDay,
          description: values.description,
          end: values.end.getTime(),
          start: values.start.getTime(),
          title: values.title,
        };

        if (event) {
          await eventsDatabase.updateEvent(event.id, data);
          toast.success("Evento atualizado!");
        } else {
          await eventsDatabase.setEvent({
            id: uuidv4(),
            userId: user!.id,
            ...data,
          });
          toast.success("Evento adicionado!");
        }

        if (!event && onAddComplete) {
          onAddComplete();
        }

        if (event && onEditComplete) {
          onEditComplete();
        }

        helpers.resetForm();
      } catch (error) {
        let message;

        if (error instanceof Error) message = error.message;
        else message = String(error);

        console.error(error);
        toast.error("Algo deu errado!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: message });
        helpers.setSubmitting(false);
        helpers.resetForm();
      }
    },
  });

  const handleStartDateChange = (date: Date | string | null): void => {
    formik.setFieldValue("start", date);

    // Prevent end date to be before start date
    if (formik.values.end && date && date > formik.values.end) {
      formik.setFieldValue("end", date);
    }
  };

  const handleEndDateChange = (date: Date | string | null): void => {
    formik.setFieldValue("end", date);

    // Prevent start date to be after end date
    if (formik.values.start && date && date < formik.values.start) {
      formik.setFieldValue("start", date);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      if (!event) {
        return;
      }

      await eventsDatabase.deleteEvent(event.id);
      onDeleteComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography align="center" gutterBottom variant="h3">
            {event ? "Editar Evento" : "Adicionar Evento"}
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <TextField
            error={Boolean(formik.touched.title && formik.errors.title)}
            fullWidth
            helperText={formik.touched.title && formik.errors.title}
            label="Título"
            name="title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Box sx={{ mt: 2 }}>
            <TextField
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
              fullWidth
              helperText={
                formik.touched.description && formik.errors.description
              }
              label="Descrição"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.allDay}
                  name="allDay"
                  onChange={formik.handleChange}
                />
              }
              label="Dia inteiro"
            />
          </Box>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <Grid container spacing={2} mt={1}>
              <Grid item md={6} xs={12}>
                <DateTimePicker
                  label="Data inicial"
                  onChange={(date) =>
                    handleStartDateChange(date ? date.toDate() : null)
                  }
                  value={
                    formik.values.start ? dayjs(formik.values.start) : null
                  }
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DateTimePicker
                  label="Data final"
                  onChange={(date) =>
                    handleEndDateChange(date ? date.toDate() : null)
                  }
                  value={formik.values.end ? dayjs(formik.values.end) : null}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          {Boolean(formik.touched.end && formik.errors.end) && (
            <Box sx={{ mt: 2 }}>
              <FormHelperText error>
                {formik.errors.end as ReactNode}
              </FormHelperText>
            </Box>
          )}
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            p: 2,
          }}
        >
          {event && (
            <IconButton onClick={(): Promise<void> => handleDelete()}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />

          <Button onClick={onClose}>Cancelar</Button>
          <Button
            disabled={formik.isSubmitting}
            sx={{ ml: 1 }}
            type="submit"
            variant="contained"
          >
            Confirmar
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
