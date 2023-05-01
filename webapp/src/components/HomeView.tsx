import { Button, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { CombinedDataProvider, Text, useSession } from "@inrupt/solid-ui-react";

const HomeView = () => {
  const { t } = useTranslation();
  const { session: { info: { isLoggedIn, webId } } } = useSession();

  return (
    <Stack spacing={'2em'} sx={{ color: 'white', alignItems: 'center' }}>
      <h1>
        {t("HomeView.welcome")}
        {isLoggedIn && (
          <CombinedDataProvider datasetUrl={webId!} thingUrl={webId!}>
            <span>, </span>
            <Text property={FOAF.name} errorComponent={() => <>{webId!.substring(8).split('.')[0]}</>} />
          </CombinedDataProvider>
        )}
        !
      </h1>
      <Grid container alignItems="center" spacing='2em' sx={{
        width: {
          xs: '80%',
          sm: '80%',
          md: '55em',
        }, height: '100%'
      }}>
        <Grid item xs={12} md={3}>
          <img src="/solid.svg" className="App-logo" alt="LoMap" width={'100%'} />
        </Grid>
        <Grid item xs={12} md={9}>
          <p align='justify'>{t("HomeView.p1")}</p>
          <p align='justify'>{t("HomeView.p2")}</p>
          <p align='justify'>{t("HomeView.p3")}</p>
        </Grid>
      </Grid>
      <Link to="/map">
        <Button className='greenButton' variant="contained" sx={{ my: 2 }}>{t("HomeView.start")}</Button>
      </Link>
    </Stack>
  );
}

export default HomeView; 