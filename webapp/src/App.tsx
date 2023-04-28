import { getPublicLocations } from './api/API';
import HomeView from './components/HomeView';
import { NavBar } from './components/NavBar';
import i18n from './internationalization/i18n';
import { IPMarker } from './shared/SharedTypes';
import { Routes, Route } from "react-router-dom";
import { useSession } from '@inrupt/solid-ui-react';
import { loadMapApi } from './utils/GoogleMapsUtils';
import { useContext, useEffect, useState } from 'react';
import MapView from './components/map/mapAddons/MapView';
import { FriendsView } from './components/friends/FriendsView';
import UbicationsView from './components/map/mapAddons/LocationsView';
import { MarkerContext, Types } from './context/MarkerContextProvider';
import { readFriendMarkers, readMarkers, saveMarkers } from './helpers/SolidHelper';
import { CircularProgress } from '@mui/material';

function App(): JSX.Element {
  const { session } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [locale, setLocale] = useState<string>(i18n.language);
  const { state: markers, dispatch } = useContext(MarkerContext);

  session.onLogin(loadMarkers);
  session.onSessionRestore(loadMarkers);

  session.onLogout(() => {
    setMarkers([]);
  })

  async function loadMarkers() {
    let markers = await readFriendMarkers(session.info.webId!);
    (await readMarkers(session.info.webId!)).forEach(m => markers.push(m));
    parseFromDB(await getPublicLocations()).forEach(m => markers.push(m));
    setMarkers(markers);
  }

  const parseFromDB = (json: any[]): IPMarker[] => {
    let ubications: IPMarker[] = [];
    json.forEach(e => {
      let mark: IPMarker = e
      mark.isPublic = true
      mark.canFriendsSee = false
      mark.id = e._id

      ubications.push(mark)
    });

    return ubications
  }

  function setMarkers(markers: IPMarker[]) {
    dispatch({ type: Types.SET_MARKERS, payload: { markers: markers } });
  }

  useEffect(() => {
    if (session.info.isLoggedIn) {
      saveMarkers(markers.filter((marker) => marker.webId === session.info.webId! && marker.id.includes('-')), session.info.webId!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  useEffect(() => {
    session.setMaxListeners(0);

    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, [session]);

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
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        )}
        />
        <Route path="/ubications" element={
          <UbicationsView />
        } />
        <Route path="/friends" element={
          <FriendsView loadMarkers={loadMarkers} />
        } />
      </Routes >
    </>
  );
}

export default App;