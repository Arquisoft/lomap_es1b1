import HomeView from './components/HomeView';
import { NavBar } from './components/NavBar';
import { IPMarker } from './shared/SharedTypes';
import { Routes, Route } from "react-router-dom";
import { useSession } from '@inrupt/solid-ui-react';
import { loadMapApi } from './utils/GoogleMapsUtils';
import { useContext, useEffect, useState } from 'react';
import MapView from './components/map/mapAddons/MapView';
import { FriendsView } from './components/friends/FriendsView';
import UbicationsView from './components/map/mapAddons/UbicationsView';
import { MarkerContext, Types } from './context/MarkerContextProvider';
import { readFriendMarkers, readMarkers, saveMarkers } from './helpers/SolidHelper';
import { getUbicaciones } from './api/API';

function App(): JSX.Element {
  const { session } = useSession();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { state: markers, dispatch } = useContext(MarkerContext);

  session.onLogin(async () => {
    let markers = await readFriendMarkers(session.info.webId!);
    (await readMarkers(session.info.webId!)).forEach(m => markers.push(m));
    parseFromDB(await getUbicaciones()).forEach(m => markers.push(m))
    setMarkers(markers);
  })

  session.onLogout(async () => {
    setMarkers(parseFromDB(await getUbicaciones()))
  })

  function setMarkers(markers: IPMarker[]) {
    dispatch({ type: Types.SET_MARKERS, payload: { markers: markers } });
  }

  const parseFromDB = (json: any[]): IPMarker[] => {
    let ubications: IPMarker[] = []
    json.forEach(e => {
      let mark: IPMarker = e
      mark.isPublic = false
      mark.id = e._id
      ubications.push(mark)
    });
    return ubications
  }

  useEffect(() => {
    if (session.info.isLoggedIn) {
      saveMarkers(markers.filter((marker) => marker.webId === session.info.webId! && marker.id.includes('-')), session.info.webId!);
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
      <NavBar />
      <Routes>
        <Route path="/" element={
          <HomeView />
        } />
        <Route path="/map" element={scriptLoaded &&
          (<MapView />)
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