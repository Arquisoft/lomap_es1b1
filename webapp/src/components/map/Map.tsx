import './Map.css';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { IPMarker } from '../../shared/SharedTypes';
import { useSession } from '@inrupt/solid-ui-react';
import { MarkerContext, Types } from '../../context/MarkerContextProvider';
import React, { useEffect, useRef, useState, useContext, MutableRefObject } from 'react';

interface IMarker {
    name: string;
    address: string;
    category: string;
    description: string;
    latLng: GoogleLatLng;
}

interface ICouple {
    marker: GoogleMarker;
    infoWindow: GoogleInfoWindow;
}

type GoogleMap = google.maps.Map;
type GoogleLatLng = google.maps.LatLng;
type GoogleMarker = google.maps.Marker;
type GoogleInfoWindow = google.maps.InfoWindow;

interface IMapProps {
    locale: string;
    globalLat: number;
    globalLng: number;
    globalName: string;
    globalMode: string;
    globalAddress: string;
    globalCategory: string;
    acceptedMarker: boolean;
    globalFilterName: string;
    mapTypeControl?: boolean;
    globalDescription: string;
    mapType: google.maps.MapTypeId;
    globalFilterCategories: string[];
    nextID: MutableRefObject<string>;
    setGlobalLat: (globalLat: number) => void;
    setGlobalLng: (globalLng: number) => void;
    setMarkerShown: (marker: IPMarker) => void;
    setDetailedIWOpen: (open: boolean) => void;
    setGlobalAddress: (globalAddress: string) => void;
    setAcceptedMarker: (acceptedMarker: boolean) => void;
}

const Map: React.FC<IMapProps> = (props) => {
    const { t } = useTranslation();
    const { session } = useSession();
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    const listenerRef = useRef<google.maps.MapsEventListener>();
    const { state: markers, dispatch } = useContext(MarkerContext);
    const [lastAddedCouple, setLastAddedCouple] = useState<ICouple>();
    const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } else {
            if (session.info.isLoggedIn) {
                addInitMarker();
                initEventListener();
            }
            addHomeMarker(map.getCenter());
        }
    };

    useEffect(() => {
        startMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(43.5276892, -5.6355573);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                initMap(4, new google.maps.LatLng(coords.latitude, coords.longitude))
            }, () => {
                initMap(4, defaultAddress);
            })
        } else {
            initMap(4, defaultAddress);
        }
    };

    const initEventListener = (): void => {
        listenerRef.current = google.maps.event.addListener(map!, 'click', async function (e) {
            props.setGlobalLat(e.latLng.lat());
            props.setGlobalLng(e.latLng.lng());

            setMarker({
                address: "",
                latLng: e.latLng,
                name: "Placeholder nombre",
                category: "Placeholder categoría",
                description: "Placeholder descripción"
            })
        })
    };

    session.onLogout(() => {
        lastAddedCouple?.marker.setMap(null);
        google.maps.event.removeListener(listenerRef.current!);
    });

    useEffect(() => {
        if (marker) {
            marker.name = formatName();
            marker.category = props.globalCategory;
            marker.description = formatDescription();

            addMarker(marker);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [marker]);

    const formatName = (): string => {
        return props.globalName ? props.globalName : t("Map.noName");
    }

    const formatDescription = (): string => {
        return props.globalDescription ? props.globalDescription : t("Map.noDescription");
    }

    const addMarker = (iMarker: IMarker): void => {
        if (lastAddedCouple) {
            lastAddedCouple.marker.setMap(null);
        }

        setLastAddedCouple(generateMarker(iMarker, props.nextID.current));
    };

    const generateMarker = (notAddedMarker: IMarker, id: string): ICouple => {
        const marker: GoogleMarker = new google.maps.Marker({
            position: notAddedMarker.latLng,
            icon: "blue_marker.png",
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: generateInfoWindowContent(notAddedMarker.name, notAddedMarker.category,
                notAddedMarker.description, notAddedMarker.address)
        })

        marker.addListener('click', () => {
            infoWindow.open(map, marker);

            let detailedMarker = markers.find(marker => marker.id === id);
            if (detailedMarker) {
                props.setMarkerShown(detailedMarker);
                props.setDetailedIWOpen(true);
            }
        });

        marker.addListener('rightclick', () => {
            if (markers.find(marker => marker.id === id)) {
                props.setDetailedIWOpen(false);

                marker.setMap(null);
                dispatch({ type: Types.DELETE_MARKER, payload: { id: id } });
            }
        });

        setGoogleMarkers(googleMarkers => [...googleMarkers, marker]);

        return { marker, infoWindow };
    }

    const generateInfoWindowContent = (name: string, category: string, description: string, address: string): string => {
        let result = ""

        result += `<h1>${name} (${category})</h1>`
        result += `<h2>${address}</h2>`
        result += `<p>${description}</p>`

        return result;
    }

    const addHomeMarker = (location: GoogleLatLng): void => {
        const homeMarkerConst: GoogleMarker = new google.maps.Marker({
            icon: "blue_marker.png",
            position: location,
            map: map
        });

        homeMarkerConst.addListener('click', () => {
            map?.panTo(location);
            map?.setZoom(6);
        });
    };

    const addInitMarker = (): void => {
        setMarker({
            name: "Placeholder nombre",
            address: props.globalAddress,
            category: "Placeholder categoría",
            description: "Placeholder descripción",
            latLng: new google.maps.LatLng(props.globalLat, props.globalLng)
        })
    }

    useEffect(() => {
        let location = new google.maps.LatLng(props.globalLat, props.globalLng);
        coordinateToAddress(location).then(address => props.setGlobalAddress(address));

        if (lastAddedCouple) {
            lastAddedCouple.marker.setPosition(location);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.globalLat, props.globalLng]);

    useEffect(() => {
        if (lastAddedCouple) {
            lastAddedCouple.infoWindow.setContent(
                generateInfoWindowContent(
                    formatName(),
                    props.globalCategory,
                    formatDescription(),
                    props.globalAddress
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.globalName, props.globalDescription, props.globalCategory, props.globalAddress, props.locale]);

    const updateMarkerListeners = () => {
        let updatedMarker = markers.find(marker => marker.id === props.nextID.current)!;
        generateMarker(parseMarker(updatedMarker), updatedMarker.id);
        props.nextID.current = uuid();
        lastAddedCouple?.marker.setMap(null);
    }

    useEffect(() => {
        if (lastAddedCouple && props.acceptedMarker) {
            updateMarkerListeners();

            lastAddedCouple.marker = new google.maps.Marker();
            lastAddedCouple.infoWindow = new google.maps.InfoWindow();

            props.setAcceptedMarker(false);

            addInitMarker();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.acceptedMarker]);

    useEffect(() => {
        deleteAllMarkers();

        switch (props.globalMode) {
            case 'M':
                loadContextMarkers();
                break;
            case 'A':
                loadFriendMarkers();
                break;
            case 'E':
                // <- Cargar marcadores
                break;
            default:
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.globalMode, props.globalFilterName, props.globalFilterCategories]);

    const deleteAllMarkers = (): void => {
        googleMarkers.forEach((googleMarker) => {
            if (googleMarker !== lastAddedCouple?.marker) {  // Si el marcador no es el último que se ha añadido...
                googleMarker.setMap(null);                   // Lo borra
            }
        });

        setGoogleMarkers([]);
    }

    const loadContextMarkers = (): void => {
        loadMarkers(markers.filter(m => m.webId === session.info.webId!));
    }

    const loadFriendMarkers = (): void => {
        loadMarkers(markers.filter(m => m.webId !== session.info.webId!));
    }

    const loadMarkers = (markers: IPMarker[]): void => {
        markers.filter(m => props.globalFilterCategories.includes(m.category)
            && m.name.includes(props.globalFilterName)).forEach((marker) => {
                generateMarker(parseMarker(marker), marker.id);
            })
    }

    const parseMarker = (iPMarker: IPMarker): IMarker => {
        return {
            name: iPMarker.name,
            address: iPMarker.address,
            category: iPMarker.category,
            description: iPMarker.description,
            latLng: new google.maps.LatLng(iPMarker.lat, iPMarker.lng)
        };
    }

    const coordinateToAddress = (coordinate: GoogleLatLng): Promise<string> => {
        const geocoder = new google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode(
                {
                    location: coordinate
                },
                (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        const formatedAddress = results[0].formatted_address;
                        resolve(formatedAddress);
                    } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        const formatedAddress = "Sin resultados";
                        resolve(formatedAddress);
                    } else {
                        reject(new Error(status));
                    }
                }
            )
        })
    };

    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: zoomLevel,
                    center: address,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: true,
                    rotateControl: false,
                    mapTypeId: props.mapType,
                    streetViewControl: false,
                    fullscreenControl: false,
                    draggableCursor: 'pointer',
                    gestureHandling: 'cooperative',
                    mapTypeControl: props.mapTypeControl
                })
            );
        }
    };

    return (
        <div ref={ref} className="map"></div>
    );
};

export default Map;