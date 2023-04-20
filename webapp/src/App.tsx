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

function App(): JSX.Element {
  const { session } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [locale, setLocale] = useState<string>(i18n.language);
  const { state: markers, dispatch } = useContext(MarkerContext);

  session.onLogin(async () => {
    let markers = await readFriendMarkers(session.info.webId!);
    (await readMarkers(session.info.webId!)).forEach(m => markers.push(m));

    setMarkers(markers);
  })

  session.onLogout(async () => {
    setMarkers([])
  })

  function setMarkers(markers: IPMarker[]) {
    dispatch({ type: Types.SET_MARKERS, payload: { markers: markers } });
  }

  useEffect(() => {
    if (session.info.isLoggedIn) {
      saveMarkers(markers.filter((marker) => marker.webId === session.info.webId!), session.info.webId!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

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
        <Route path="/map" element={scriptLoaded &&
          (<MapView locale={locale} />)
        } />
        <Route path="/ubications" element={
          <UbicationsView />
        } />
        <Route path="/friends" element={
          <FriendsView />
        } />
      </Routes>
    </>
  );
}

export default App;