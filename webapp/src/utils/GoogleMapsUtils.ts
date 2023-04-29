export const loadMapApi = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY_GOOGLE_MAPS}&libraries=geometry,places&language=es&region=ES&v=quarterly&callback=Function.prototype`;
    const script = document.querySelector(`script[src^="${mapsURL}"]`);

    if (script) {
        return script;
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
};