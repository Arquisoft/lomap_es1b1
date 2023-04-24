import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FOAF } from "@inrupt/vocab-common-rdf";
import { CombinedDataProvider, Text, useSession } from "@inrupt/solid-ui-react";

const HomeView = () => {
    const { t } = useTranslation();
    const { session } = useSession();

    return (
        <Container sx={{ color: 'white', textAlign: 'center' }}>
            <div>
                <h1>
                    {t("HomeView.welcome")}
                    {session.info.isLoggedIn ?
                        <CombinedDataProvider datasetUrl={session.info.webId!} thingUrl={session.info.webId!}>
                            <span>, </span><Text property={FOAF.name} errorComponent={() => <>{session.info.webId!.substring(8).split('.')[0]}</>} />
                        </CombinedDataProvider> : ""
                    }
                    !
                </h1>
            </div>
        </Container>
    );
}

export default HomeView;
