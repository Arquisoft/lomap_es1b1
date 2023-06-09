import LoginForm from './login/LoginForm';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../internationalization/i18n';
import { Link, useNavigate } from "react-router-dom";
import { FOAF, VCARD } from '@inrupt/vocab-common-rdf';
import { Stack, Button, Avatar, FormControl, Select, MenuItem } from '@mui/material';
import { useSession, LogoutButton, CombinedDataProvider, Image, Text } from '@inrupt/solid-ui-react';

interface INavBarProps {
  locale: string;
  setLocale: (locale: string) => void;
}

export const NavBar: React.FC<INavBarProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useSession();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(props.locale);
  }, [props.locale]);

  return (
    <nav>
      <Stack
        alignItems='center'
        justifyContent='left'
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Link to="/"><img src="/logo-no-background.png" className="App-logo" alt="logo" height="60" /></Link>
        <Link to="/map" style={{ color: 'white', textDecoration: 'none' }}>{t("NavBar.map")}</Link>
        {session.info.isLoggedIn ?
          <>
            <Link to="/ubications" style={{ color: 'white', textDecoration: 'none' }}>{t("NavBar.myLocations")}</Link>
            <Link to="/friends" style={{ color: 'white', textDecoration: 'none' }}>{t("NavBar.myFriends")}</Link>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
              <FormControl>
                <Select
                  value={props.locale}
                  onChange={(e) => props.setLocale(e.target.value)}
                  sx={{ height: '3em', bgcolor: 'white', margin: '1em', marginRight: '0' }}
                >
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"es-ES"}>Español</MenuItem>
                </Select>
              </FormControl>
              <CombinedDataProvider datasetUrl={session.info.webId!} thingUrl={session.info.webId!}>
                <Text style={{ color: 'white' }} property={FOAF.name} errorComponent={() => <>{session.info.webId!.substring(8).split('.')[0]}</>} />
                <Image property={VCARD.hasPhoto} style={{ width: 40, height: 40, borderRadius: "50%" }} errorComponent={() => <Avatar sx={{ width: 40, height: 40 }} />} />
              </CombinedDataProvider>
              <LogoutButton onLogout={() => navigate("/")}>
                <Button className="blueButton" variant="contained" sx={{ margin: "1em", marginLeft: "0em" }}>
                  {t("NavBar.logout")}
                </Button>
              </LogoutButton>
            </Stack>
          </>
          : <Stack direction={{ xs: 'column', sm: 'row' }} alignItems='center' sx={{ flexGrow: '2' }} justifyContent='flex-end' spacing={{ xs: 1, sm: 2, md: 4 }}>
            <FormControl>
              <Select
                value={props.locale}
                onChange={(e) => props.setLocale(e.target.value)}
                sx={{ background: "white", height: "2.5em" }}
              >
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"es-ES"}>Español</MenuItem>
              </Select>
            </FormControl>
            <Button className="blueButton" variant="contained" onClick={() => setOpen(true)} sx={{ margin: "1em !important", marginLeft: "0em" }}>
              {t("NavBar.login")}
            </Button>
            <LoginForm isOpen={isOpen} onClose={() => setOpen(false)} />
          </Stack>}
      </Stack>
    </nav>
  )
}