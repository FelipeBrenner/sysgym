import { useAuth } from "@hooks";
import { LoadingButton } from "@mui/lab";
import {
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { storage } from "@services";
import { TUserType } from "@types";
import { formatCpf, getUserAcronym } from "@utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Styles from "./ProfileGeneral.styles";

export type TTypeOptions = {
  label: string;
  value: TUserType;
};

export const ProfileGeneral = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [name, setName] = useState(user?.name);
  const [cpf, setCpf] = useState(user?.cpf ?? "");
  const [type, setType] = useState<TUserType>(user?.type!);
  const [isLoadingChangeAvatar, setIsLoadingChangeAvatar] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const typeOptions: TTypeOptions[] = [
    {
      label: "Aluno",
      value: "aluno",
    },
    {
      label: "Professor",
      value: "professor",
    },
    {
      label: "Funcionário",
      value: "funcionario",
    },
  ];

  const handleChangeAvatar = async (event: any) => {
    const [file] = event.target.files;

    if (file) {
      setIsLoadingChangeAvatar(true);
      try {
        const avatarsRef = ref(storage, `avatar-${file.name}`);
        await uploadBytes(avatarsRef, file);
        await getDownloadURL(avatarsRef).then((avatar) => {
          setAvatar(avatar);
          setIsLoadingChangeAvatar(false);
        });
      } catch (error) {
        toast.error("Erro ao alterar a imagem!");
        console.error(error);
        setIsLoadingChangeAvatar(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      setIsLoadingSave(true);
      updateUser({ avatar, name, cpf, type }).then(() =>
        setIsLoadingSave(false)
      );
    } catch (error) {
      toast.error("Erro ao alterar a imagem!");
      console.error(error);
      setIsLoadingSave(false);
    }
  };

  const hasChanged =
    avatar !== user?.avatar ||
    name !== user?.name ||
    cpf !== user?.cpf ||
    type !== user?.type;

  return (
    <>
      <Styles.Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">{t("profile.basicDetails")}</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Styles.AvatarContainer>
                <Styles.Avatar src={avatar}>
                  {getUserAcronym(user?.name, user?.email)}
                </Styles.Avatar>
                <LoadingButton
                  onClick={() => fileInputRef.current?.click()}
                  loading={isLoadingChangeAvatar}
                >
                  {t("change")}
                  <input
                    hidden
                    ref={fileInputRef}
                    type="file"
                    onChange={handleChangeAvatar}
                  />
                </LoadingButton>
              </Styles.AvatarContainer>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    value={name}
                    label="Nome"
                    size="small"
                    onChange={(event) => setName(event.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Styles.InputCpf
                    value={formatCpf(cpf)}
                    label="CPF"
                    size="small"
                    onChange={(event) => setCpf(formatCpf(event.target.value))}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      label="Tipo"
                      value={type}
                      onChange={(event) =>
                        setType(event.target.value as TUserType)
                      }
                      size="small"
                    >
                      {typeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Styles.InputEmail
                    defaultValue={user?.email}
                    disabled
                    label="Email"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Styles.Card>
      <Styles.ButtonContainer>
        <LoadingButton
          variant="contained"
          loading={isLoadingSave}
          type="submit"
          disabled={!hasChanged}
          onClick={handleSave}
        >
          {t("save")}
        </LoadingButton>
      </Styles.ButtonContainer>
    </>
  );
};
