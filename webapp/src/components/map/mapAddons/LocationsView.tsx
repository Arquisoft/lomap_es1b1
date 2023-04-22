import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Button } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../../shared/SharedTypes";
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';

const UbicationsView = () => {
    const { t } = useTranslation();
    const { session } = useSession();
    const { state: markers, dispatch } = useContext(MarkerContext);

    const myUbications = markers.filter((marker) => marker.webId === session.info.webId);

    return (
        <>
            {myUbications.length > 0 ? (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                    {myUbications.map((ubication: IPMarker) => (
                        <Grid item xs={6} sm={4} md={3} key={ubication.id}>
                            <Box sx={{ padding: '1em', bgcolor: 'white', border: 'solid', borderRadius: '2em' }}>
                                <h1 style={{ marginTop: '0em' }}>{ubication.name}</h1>
                                <p style={{ marginTop: '0em' }}>{t("LocationsView.address")}{ubication.address}</p>
                                <p>{t("LocationsView.category")}{t(`Map.${ubication.category.toLowerCase()}`)}</p>
                                <p>{t("LocationsView.description")}{ubication.description}</p>
                                <Button onClick={() => dispatch({ type: Types.DELETE_MARKER, payload: { id: ubication.id } })}>{t("LocationsView.delete")}</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <h1 style={{ color: 'white', textAlign: 'center' }}>{t("LocationsView.noLocations")}</h1>
            )}
        </>
    );
}

export default UbicationsView;