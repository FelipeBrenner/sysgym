import { useAuth } from "@hooks";
import { LoadingButton } from "@mui/lab";
import { Button, CardContent, Grid, Typography } from "@mui/material";
import { storage } from "@services";
import { getUserAcronym } from "@utils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as Styles from "./ProfileGeneral.styles";

export const ProfileGeneral = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name);
  const [isLoadingSaveName, setIsLoadingSaveName] = useState(false);
  const [isLoadingChangeAvatar, setIsLoadingChangeAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveName = async () => {
    setIsLoadingSaveName(true);
    await updateUser({ name });
    setIsLoadingSaveName(false);
  };

  const handleChangeAvatar = async (event: any) => {
    if (event.target.files[0]) {
      setIsLoadingChangeAvatar(true);
      try {
        const avatarsRef = ref(storage, `avatar-${user?.email}`);
        await uploadBytes(avatarsRef, event.target.files[0]);
        await getDownloadURL(avatarsRef).then((avatar) => {
          updateUser({ avatar }).then(() => setIsLoadingChangeAvatar(false));
        });
      } catch (error) {
        toast.error("Erro ao alterar a imagem!");
        console.error(error);
        setIsLoadingChangeAvatar(false);
      }
    }
  };

  return (
    <Styles.Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Typography variant="h6">{t("profile.basicDetails")}</Typography>
          </Grid>
          <Grid item md={8} xs={12}>
            <Styles.Box>
              <Styles.Avatar src={user?.avatar}>
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
            </Styles.Box>
            <Styles.Box mt={3}>
              <Styles.InputName
                value={name}
                label="Name"
                size="small"
                onChange={(event) => setName(event.target.value)}
              />
              <LoadingButton
                disabled={name === user?.name}
                onClick={handleSaveName}
                loading={isLoadingSaveName}
              >
                {t("save")}
              </LoadingButton>
            </Styles.Box>
            <Styles.Box mt={3}>
              <Styles.InputEmail
                defaultValue={user?.email}
                disabled
                label="Email"
                size="small"
              />
              <Button>{t("edit")}</Button>
            </Styles.Box>
          </Grid>
        </Grid>
      </CardContent>
    </Styles.Card>
  );
};
