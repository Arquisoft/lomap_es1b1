import { render, screen } from '@testing-library/react';
import MapView from './MapView';

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

});