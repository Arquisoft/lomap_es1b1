import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { CombinedDataProvider, Text, useSession } from "@inrupt/solid-ui-react";

const HomeView = () => {
  const { t } = useTranslation();
  const { session: { info: { isLoggedIn, webId } } } = useSession();

  return (
    <Box sx={{ color: 'white', textAlign: 'center' }}>
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
    </Box>
  );
}

export default HomeView;