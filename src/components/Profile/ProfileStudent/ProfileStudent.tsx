import { enrollmentsDatabase } from "@database";
import { useAuth } from "@hooks";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IEnrollment, TUserType } from "@types";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Styles from "./ProfileStudent.styles";

export type TTypeOptions = {
  label: string;
  value: TUserType;
};

export const ProfileStudent = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<IEnrollment>();
  const [savedEnrollment, setSavedEnrollment] = useState<IEnrollment>();
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  useEffect(() => {
    const loadEnrollment = async () => {
      const enrollment = await enrollmentsDatabase.getEnrollment(user?.id);
      const enrollmentFormatted = {
        id: user?.id ?? "",
        cpf: user?.cpf ?? "",
        date: enrollment?.date ?? null,
        plan: enrollment?.plan,
        observation: enrollment?.observation,
      };

      setEnrollment(enrollmentFormatted);
      setSavedEnrollment(enrollmentFormatted);
    };

    loadEnrollment();
  }, []);

  const planOptions = [
    {
      label: "1 x R$100,00",
      value: "1x100",
    },
    {
      label: "3 x R$95,00",
      value: "3x95",
    },
    {
      label: "6 x R$90,00",
      value: "6x90",
    },
    {
      label: "12 x R$85,00",
      value: "12x85",
    },
  ];

  const handleCancel = async () => {
    setEnrollment(savedEnrollment);
  };

  const handleSave = async () => {
    try {
      if (enrollment) {
        setIsLoadingSave(true);
        const enrollmentFormatted = {
          ...enrollment,
          date: enrollment?.date?.toString() ?? null,
        };
        enrollmentsDatabase.updateEnrollment(enrollmentFormatted).then(() => {
          toast.success("Matrícula atualizada com sucesso!");
          setSavedEnrollment(enrollmentFormatted);
          setIsLoadingSave(false);
        });
      }
    } catch (error) {
      toast.error("Erro ao alterar a imagem!");
      console.error(error);
      setIsLoadingSave(false);
    }
  };

  const hasChanged =
    JSON.stringify(enrollment) !== JSON.stringify(savedEnrollment);

  return (
    <>
      <Styles.Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Matrícula</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              {enrollment ? (
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Plano</InputLabel>
                      <Select
                        label="Plano"
                        value={enrollment.plan}
                        onChange={(event) =>
                          setEnrollment({
                            ...enrollment,
                            plan: event.target.value,
                          })
                        }
                        size="small"
                      >
                        <MenuItem value="">
                          <em>Nenhum</em>
                        </MenuItem>
                        {planOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                    >
                      <DatePicker
                        label="Data inicial"
                        onChange={(date) =>
                          setEnrollment({
                            ...enrollment,
                            date: date ? date.toString() : null,
                          })
                        }
                        value={enrollment.date ? dayjs(enrollment.date) : null}
                        format="DD/MM/YYYY"
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      value={enrollment.observation}
                      label="Observação"
                      size="small"
                      onChange={(event) =>
                        setEnrollment({
                          ...enrollment,
                          observation: event.target.value,
                        })
                      }
                      multiline
                      minRows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Styles.Card>
      <Styles.ButtonContainer>
        <Button onClick={handleCancel} disabled={!hasChanged}>
          Cancelar
        </Button>
        <LoadingButton
          variant="contained"
          loading={isLoadingSave}
          type="submit"
          disabled={!hasChanged}
          onClick={handleSave}
          sx={{ marginLeft: 2 }}
        >
          {t("save")}
        </LoadingButton>
      </Styles.ButtonContainer>
    </>
  );
};
