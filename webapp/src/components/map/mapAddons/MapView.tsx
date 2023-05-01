import Map from '../Map';
import { v4 as uuid } from 'uuid';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import NewUbicationForm from './NewLocationForm';
import { useSession } from '@inrupt/solid-ui-react';
import { addPublicLocation } from '../../../api/API';
import { IPMarker } from "../../../shared/SharedTypes";
import DetailedUbicationView from './DetailedInfoWindow';
import { useState, useContext, useRef, useEffect } from 'react';
import { MarkerContext, Types } from '../../../context/MarkerContextProvider';
import {
    Box,
    Grid,
    Stack,
    Button,
    Dialog,
    Select,
    MenuItem,
    TextField,
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from '@mui/material';

interface IMapViewProps {
    locale: string;
}

const MapView: React.FC<IMapViewProps> = (props) => {
    const { t } = useTranslation();
    const { session } = useSession();
    const nextID = useRef<string>(uuid());
    const { dispatch } = useContext(MarkerContext);
    const [globalLat, setGlobalLat] = useState<number>(0);
    const [globalLng, setGlobalLng] = useState<number>(0);
    const [globalName, setGlobalName] = useState<string>("");
    const [globalMode, setGlobalMode] = useState<string>("S");
    const [isFormOpen, setFormOpen] = useState<boolean>(false);
    const [globalAddress, setGlobalAddress] = useState<string>("");
    const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
    const [globalCategory, setGlobalCategory] = useState<string>("P");
    const [globalFilterName, setGlobalFilterName] = useState<string>("");
    const [acceptedMarker, setAcceptedMarker] = useState<boolean>(false);
    const [globalFilterWebId, setGlobalFilterWebId] = useState<string>("");
    const [globalDescription, setGlobalDescription] = useState<string>("");
    const [isDetailedIWOpen, setDetailedIWOpen] = useState<boolean>(false);
    const [globalFilterCategories, setGlobalFilterCategories] = useState([
        'M', 'P', 'Ti', 'Ed', 'F', 'Tr', 'R', 'En'
    ]);
    const [markerShown, setMarkerShown] = useState<IPMarker>({
        id: "", date: new Date(), lat: 0, lng: 0, name: "Sin nombre",
        webId: "", address: "Sin dirección", category: "Sin categoría", isPublic: false,
        description: "Sin descripción", canFriendsSee: false, reviews: []
    });

    const addMarker = (isPublic: boolean) => {
        let marker = {
            id: nextID.current, date: new Date(), lat: globalLat, lng: globalLng, name: globalName,
            webId: session.info.webId!, address: globalAddress, category: globalCategory, isPublic: isPublic,
            description: globalDescription, canFriendsSee: false, reviews: []
        }

        if (isPublic) {
            addPublicLocation(marker);
        }

        dispatch({ type: Types.ADD_MARKER, payload: { marker: marker } });


        setGlobalLat(0);
        setGlobalLng(0);
        setGlobalName("");
        setGlobalCategory("P");
        setGlobalDescription("");

        setAcceptedMarker(true);
    };

    const handleCategories = (
        event: React.MouseEvent<HTMLElement>,
        newCategories: string[]
    ) => {
        setGlobalFilterCategories(newCategories);
    };

    session.onLogout(() => {
        setGlobalMode("S");
    });

    useEffect(() => {
        closeForms();
    }, [globalMode]);

    const closeForms = () => {
        setFormOpen(false);
        setDetailedIWOpen(false);
    }

    return (
        <Grid container sx={{ width: '100%', height: '100%' }}>
            <Grid item xs={12}>
                <Stack direction={'row'} alignItems={'center'}>
                    {session.info.isLoggedIn ?
                        <Select
                            value={globalMode}
                            onChange={(e) => setGlobalMode(e.target.value)}
                            sx={{ width: '15em', height: '3em', bgcolor: 'white', margin: '1em' }}
                        >
                            <MenuItem disabled value={'S'}><em>{t("MapView.select")}</em></MenuItem>
                            <MenuItem value={'E'}>{t("MapView.explore")}</MenuItem>
                            <MenuItem value={'M'}>{t("MapView.myLocations")}</MenuItem>
                            <MenuItem value={'A'}>{t("MapView.friendsLocations")}</MenuItem>
                        </Select>
                        :
                        <Select
                            value={globalMode}
                            onChange={(e) => setGlobalMode(e.target.value)}
                            sx={{ width: '15em', height: '3em', bgcolor: 'white', margin: '1em' }}
                        >
                            <MenuItem disabled value={'S'}><em>{t("MapView.select")}</em></MenuItem>
                            <MenuItem value={'E'}>{t("MapView.explore")}</MenuItem>
                        </Select>}
                    <Button className='blueButton' variant="contained" onClick={() => setFilterOpen(true)}>
                        {t("MapView.filters")}
                    </Button>
                    <Dialog onClose={() => setFilterOpen(false)} open={isFilterOpen}>
                        <Stack direction='column' padding={'1em'}>
                            <Stack direction='row'>
                                <h1 style={{ margin: '0' }}>{t("MapView.filterLocations")}</h1>
                                <IconButton sx={{ marginLeft: 'auto', marginRight: '0em' }} onClick={async () => setFilterOpen(false)}><Close /></IconButton>
                            </Stack>
                            <h2>{t("MapView.name")}</h2>
                            <TextField value={globalFilterName} onChange={(e) => setGlobalFilterName(e.target.value as string)}></TextField>
                            <h2>{t("MapView.creatorWebID")}</h2>
                            <TextField value={globalFilterWebId} onChange={(e) => setGlobalFilterWebId(e.target.value as string)}></TextField>
                            <h2>{t("MapView.categories")}</h2>
                            <ToggleButtonGroup
                                onChange={handleCategories}
                                value={globalFilterCategories}
                                aria-label="Categorías seleccionadas"
                                sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <ToggleButton sx={{ flex: '1' }} value="P" aria-label="parques">{t("MapView.parks")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="M" aria-label="museos">{t("MapView.museums")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Ti" aria-label="tiendas">{t("MapView.shops")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Ed" aria-label="edificios">{t("MapView.buildings")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="F" aria-label="farmacias">{t("MapView.pharmacies")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="R" aria-label="restaurantes">{t("MapView.restaurants")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="Tr" aria-label="transporte">{t("MapView.transportation")}</ToggleButton>
                                <ToggleButton sx={{ flex: '1' }} value="En" aria-label="entretenimiento">{t("MapView.entertainment")}</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Dialog>
                    <Box sx={{ flexGrow: 2 }}></Box>
                    {session.info.isLoggedIn && <Tooltip title={globalMode === 'M' ? "" : t("MapView.tooltip")}>
                        <span>
                            <Button
                                disabled={globalMode !== 'M'}
                                variant="contained"
                                className='blueButton'
                                sx={{
                                    width: '15em',
                                    margin: '1em',
                                    display: isFormOpen ? 'none' : '',
                                }}
                                onClick={async () => setFormOpen(!isFormOpen)}
                            >{t("MapView.newLocation")}</Button>
                        </span>
                    </Tooltip>}
                </Stack>
            </Grid>
            <Grid item xs={isDetailedIWOpen ? 12 : 0} md={isDetailedIWOpen ? 3 : 0}>
                <DetailedUbicationView
                    markerShown={markerShown}
                    isDetailedIWOpen={isDetailedIWOpen}
                    setDetailedIWOpen={setDetailedIWOpen}
                />
            </Grid>
            <Grid item xs={12} md={12 - (isFormOpen ? 3 : 0) - (isDetailedIWOpen ? 3 : 0)} sx={{ width: '100%', height: '100%' }}>
                <Map
                    nextID={nextID}
                    locale={props.locale}
                    mapTypeControl={true}
                    globalLat={globalLat}
                    globalLng={globalLng}
                    globalMode={globalMode}
                    globalName={globalName}
                    formOpened={isFormOpen}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    globalAddress={globalAddress}
                    acceptedMarker={acceptedMarker}
                    globalCategory={globalCategory}
                    setMarkerShown={setMarkerShown}
                    setGlobalAddress={setGlobalAddress}
                    globalFilterName={globalFilterName}
                    globalFilterWebID={globalFilterWebId}
                    setAcceptedMarker={setAcceptedMarker}
                    globalDescription={globalDescription}
                    setDetailedIWOpen={setDetailedIWOpen}
                    mapType={google.maps.MapTypeId.ROADMAP}
                    globalFilterCategories={globalFilterCategories}
                />
            </Grid>
            <Grid item xs={12} md={3} >
                <NewUbicationForm
                    globalLat={globalLat}
                    globalLng={globalLng}
                    addMarker={addMarker}
                    globalName={globalName}
                    formOpened={isFormOpen}
                    setGlobalLat={setGlobalLat}
                    setGlobalLng={setGlobalLng}
                    setFormOpened={setFormOpen}
                    setGlobalName={setGlobalName}
                    globalAddress={globalAddress}
                    globalCategory={globalCategory}
                    globalDescription={globalDescription}
                    setGlobalCategory={setGlobalCategory}
                    setAcceptedMarker={setAcceptedMarker}
                    setGlobalDescription={setGlobalDescription}
                />
            </Grid>
        </Grid>
    );
}

export default MapView;
