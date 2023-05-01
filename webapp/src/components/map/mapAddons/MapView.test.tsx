import { render, screen, fireEvent } from '@testing-library/react';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { v4 as uuid } from 'uuid';
import MapView from './MapView';
import { loadMapApi } from '../../../utils/GoogleMapsUtils';
import { MarkerContextProvider } from '../../../context/MarkerContextProvider';

const setupGoogleMock = () => {
    global.window.google = {
        maps: {
            Geocoder: class {
                public async geocode() {
                    return Promise.resolve()
                }
            },
            LatLng: jest.fn(),
            Map: class {
                public async getCenter() {
                    return Promise.resolve()
                }
            },
            Marker: class {
                public async addListener() {
                }
            },
            getCenter: jest.fn(),
            event: { removeListener: jest.fn() },
            GeocoderStatus: {
                ERROR: 'ERROR',
                INVALID_REQUEST: 'INVALID_REQUEST',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
            MapTypeId: {
                ROADMAP: 'ROADMAP'
            }
        } as any,
    };
};

describe('MapView component', () => {
    jest.mock('@inrupt/solid-ui-react', () => ({
        __esModule: true,
        useSession: () => ({
            session: { info: { isLoggedIn: true, webId: "https://example.com/user1#me" }, onLogout: jest.fn },
        }),
    }));
    setupGoogleMock();
    test('renders MapView component', () => {
        render(
            <MapView locale='es' />
        );
        const test = screen.getByText("MapView.filters")
        expect(test).toBeInTheDocument();
    });

    /*
            const button = screen.getByRole('button', { name: 'MapView.filters' });
                const button2 = screen.getByRole('button', { name: 'MadsdsfsdfpView.filters' });
                const select = screen.getByRole('combobox', { name: 'MapView.select' });
                fireEvent.click(select)
                const option = screen.getByRole('button')
                //fireEvent.click(button)
    */

});