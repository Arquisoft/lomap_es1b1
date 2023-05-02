import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, Dialog, FormGroup, Stack, Select, MenuItem, TextField, Container } from "@mui/material";

export interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginForm: React.FC<LoginProps> = (props) => {
  const { t } = useTranslation();
  const { onClose, isOpen } = props;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [oidcIssuer, setOidcIssuer] = useState<string>("");
  const [itemSelected, setItemSelected] = useState<string>("https://inrupt.net/");

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (itemSelected !== "otro") {
      setDisabled(true);
      setOidcIssuer(itemSelected);
    } else {
      setDisabled(false);
    }
  }, [itemSelected]);

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Container sx={{ display: 'flex', padding: '0.5em !important' }}>
        <div style={{ margin: '1em' }}>
          <p>{t("LoginForm.selectProvider")}</p>
        </div>
        <div>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
            <FormGroup>
              <Select
                role="slcRole"
                value={itemSelected}
                onChange={e => setItemSelected(e.target.value)}
                sx={{ width: '15em', margin: '0.5em' }}
              >
                <MenuItem value={"https://inrupt.net/"}>Inrupt</MenuItem>
                <MenuItem value={"https://solidcommunity.net/"}>SOLID community</MenuItem>
                <MenuItem value={"otro"}>{t("LoginForm.otherProvider")}</MenuItem>
              </Select>
              <TextField
                role="txtRole"
                type="url"
                value={oidcIssuer}
                onChange={e => setOidcIssuer(e.target.value)}
                sx={{ width: '15em', margin: '0.5em' }}
                disabled={disabled}
              />
              <LoginButton oidcIssuer={oidcIssuer} redirectUrl={process.env.REACT_APP_API_URI || "http://localhost:3000"}>
                <Button variant="contained" sx={{ width: '17.25em', margin: '0.5em' }}>
                  {t("LoginForm.login")}
                </Button>
              </LoginButton>
            </FormGroup>
          </Stack>
        </div>
      </Container>
    </Dialog>
  );
}

export default LoginForm;
