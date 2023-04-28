import HomeView from './components/HomeView';
import { NavBar } from './components/NavBar';
import { getPublicLocations } from './api/API';
import i18n from './internationalization/i18n';
import { IPMarker } from './shared/SharedTypes';
import { Routes, Route } from "react-router-dom";
import { useSession } from '@inrupt/solid-ui-react';
import { loadMapApi } from './utils/GoogleMapsUtils';
import { Box, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import MapView from './components/map/mapAddons/MapView';
import { FriendsView } from './components/friends/FriendsView';
import UbicationsView from './components/map/mapAddons/LocationsView';
import { MarkerContext, Types } from './context/MarkerContextProvider';
import { readFriendMarkers, readMarkers, saveMarkers } from './helpers/SolidHelper';


function App(): JSX.Element {
  const { session } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { state: markers, dispatch } = useContext(MarkerContext);
  const [locale, setLocale] = useState<string>(["en", "es-ES"].includes(i18n.language) ? i18n.language : "en");

  function setMarkers(markers: IPMarker[]) {
    dispatch({ type: Types.SET_MARKERS, payload: { markers: markers } });
  }

  async function loadMarkers() {
    let markers = await readFriendMarkers(session.info.webId!);
    (await readMarkers(session.info.webId!)).forEach(m => markers.push(m));
    //(await getPublicLocations()).forEach(m => markers.push(m));
    setMarkers(markers);
  }

  useEffect(() => {
    session.setMaxListeners(0);

    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, [session]);

  useEffect(() => {
    if (session.info.isLoggedIn) {
      saveMarkers(markers.filter((marker) => marker.webId === session.info.webId! && !marker.isPublic), session.info.webId!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  session.onLogin(loadMarkers);
  session.onSessionRestore(loadMarkers);

  session.onLogout(() => {
    setMarkers([]);
  })

  return (
    <>
      <NavBar
        locale={locale}
        setLocale={setLocale}
      />
      <Routes>
        <Route path="/" element={
          <HomeView />
        } />
        <Route path="/map" element={scriptLoaded ? (
          <MapView locale={locale} />
        ) : (
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        />
        <Route path="/ubications" element={
          <UbicationsView />
        } />
        <Route path="/friends" element={
          <FriendsView loadMarkers={loadMarkers} />
        } />
      </Routes>
    </>
  );
}

export default App;