import { Container } from "@mui/material"
import { CombinedDataProvider, Text, useSession } from "@inrupt/solid-ui-react";
import { FOAF } from "@inrupt/vocab-common-rdf";

const HomeView = () => {
    const { session } = useSession();

    return (
        <Container sx={{ color: 'white', textAlign: 'center' }}>
            <div>
                <h1>
                    ¡Bienvenido
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
