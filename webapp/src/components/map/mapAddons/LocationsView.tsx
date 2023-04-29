import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../../shared/SharedTypes";
import { deletePublicMarker } from '../../../helpers/SolidHelper';
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';
import { deletePublicLocation } from '../../../api/API';

const UbicationsView = () => {
    const { t } = useTranslation();
    const { session } = useSession();
    const { state: markers, dispatch } = useContext(MarkerContext);
    const myLocations = markers.filter((marker) => marker.webId === session.info.webId);

    const loadStaticMap = (lat: number, lng: number) => {
        const APIKey = "&key=" + process.env.REACT_APP_API_KEY_GOOGLE_MAPS;
        const URL = "https://maps.googleapis.com/maps/api/staticmap?";

        const center = "center=" + lat + "," + lng;
        const zoom = "&zoom=15";
        const size = "&size=500x500";

        const marker = "&markers=color:red%7C" + lat + "," + lng;
        const sensor = "&sensor=false";

        const mapImage = URL + center + zoom + size + marker + sensor + APIKey;
        return mapImage;
    }

    const deleteLocation = async (location: IPMarker) => {
        dispatch({ type: Types.DELETE_MARKER, payload: { id: location.id } });
        if (location.canFriendsSee) {
            await deletePublicMarker(location, session.info.webId!);
        }
        if (location.isPublic) {
            await deletePublicLocation(location);
        }
    }

    return (
        <>
            {myLocations.length > 0 ? (
                <Stack direction="row" flexWrap={'wrap'} sx={{ padding: '2em' }}>
                    {myLocations.map((location: IPMarker) => (
                        <Box sx={{ margin: '1em', padding: '1em', bgcolor: 'white', borderRadius: '0.5em' }}>
                            <h1 style={{ marginTop: '0em' }}>{location.name}</h1>
                            <img src={loadStaticMap(location.lat, location.lng)} width={'100%'} alt="imagen-mapa" />
                            <p style={{ marginTop: '0em' }}>{t("LocationsView.address")}{location.address}</p>
                            <p>{t("LocationsView.category")}{t(`Map.${location.category.toLowerCase()}`)}</p>
                            <p>{t("LocationsView.description")}{location.description}</p>
                            <p>{t("LocationsView.visibility")}{location.isPublic ? t("LocationsView.public") : (location.canFriendsSee ? t("LocationsView.friends") : t("LocationsView.private"))}</p>
                            <Button onClick={() => deleteLocation(location)}>{t("LocationsView.delete")}</Button>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <h1 style={{ color: 'white', textAlign: 'center' }}>{t("LocationsView.noLocations")}</h1>
            )}
        </>
    );
}

export default UbicationsView;