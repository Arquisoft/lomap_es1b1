import { useContext } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { useSession } from '@inrupt/solid-ui-react';
import { IPMarker } from "../../../shared/SharedTypes";
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';

const UbicationsView = () => {
    const { session } = useSession();
    const { state: markers, dispatch } = useContext(MarkerContext);

    const myUbications = markers.filter((marker) => marker.webId === session.info.webId);

    const cargarMapaEstatico = (lat: number, lng: number) => {
        const apiKey = "&key=" + process.env.REACT_APP_API_KEY_GOOGLE_MAPS;
        const URL = "https://maps.googleapis.com/maps/api/staticmap?";

        const centro = "center=" + lat + "," + lng;
        const zoom ="&zoom=15";
        const tamaño= "&size=500x500";

        const marcador = "&markers=color:red%7C" + lat + "," + lng;
        const sensor = "&sensor=false"; 

        const imagenMapa = URL + centro + zoom + tamaño + marcador + sensor + apiKey;
        return imagenMapa
    }

    return (
        <>
            {myUbications.length > 0 ? (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: '2em' }}>
                    {myUbications.map((ubication: IPMarker) => (
                        <Grid item xs={6} sm={4} md={3} key={ubication.id}>
                            <Box sx={{ padding: '1em', bgcolor: 'white', borderRadius: '0.5em' }}>
                                <h1 style={{ marginTop: '0em' }}>{ubication.name}</h1>
                                <img src={cargarMapaEstatico(ubication.lat, ubication.lng)} width='100%' alt="imagen-mapa"/>
                                <p style={{ marginTop: '0em' }}>Dirección: {ubication.address}</p>
                                <p>Categoría: {ubication.category}</p>
                                <p>Descripción: {ubication.description}</p>
                                <p>Visibilidad: {ubication.id.includes("-") ? (ubication.isPublic ? 'Amigos' : 'Privada') : 'Pública'}</p>
                                <Button onClick={() => dispatch({ type: Types.DELETE_MARKER, payload: { id: ubication.id } })}>Borrar</Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <h1 style={{ color: 'white', textAlign: 'center' }}>Aún no has creado ninguna ubicación</h1>
            )}
        </>
    );
}

export default UbicationsView;