import { render, screen } from '@testing-library/react';
import Map from './Map'
import { IPMarker } from '../../shared/SharedTypes';

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
      InfoWindow: class {
        
      },
      event: { removeListener: jest.fn(),
      addListener: jest.fn() },

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


// Mock the useSession hook
jest.mock('@inrupt/solid-ui-react', () => ({
  __esModule: true,
  useSession: () => ({
    session: { info: { isLoggedIn: true }, onLogout: jest.fn },
  }),
}));

describe('Map component', () => {
  setupGoogleMock();

  const marker1: IPMarker = {
    id: "1",
    date: new Date(),
    lat: 0,
    lng: 0,
    name: "Test marker 1",
    webId: "https://example.com/user1#me",
    address: "123 Main St",
    category: "Test",
    isPublic: false,
    reviews: [],
    canFriendsSee: false,
    description: "This is a test marker",
  };
  const marker2: IPMarker = {
    id: "2",
    date: new Date(),
    lat: 0,
    lng: 0,
    name: "Test marker 2",
    webId: "https://example.com/user1#me",
    address: "456 Main St",
    category: "Test",
    isPublic: true,
    reviews: [],
    canFriendsSee: false,
    description: "This is another test marker",
  };
  const marker3: IPMarker = {
    id: "3",
    date: new Date(),
    lat: 0,
    lng: 0,
    name: "Test marker 2",
    webId: "https://example.com/user1#me",
    address: "456 Main St",
    category: "Test",
    isPublic: false,
    reviews: [],
    canFriendsSee: true,
    description: "This is another test marker",
  };

  const markerList = [marker1, marker2, marker3];

  const props1: any = {
    globalLat: 0,
    globalLng: 0,
    globalName: '',
    globalMode: '',
    globalAddress: '',
    globalCategory: '',
    acceptedMarker: false,
    globalFilterName: '',
    mapTypeControl: true,
    globalDescription: '',
    mapType: 'ROADMAP',
    globalFilterCategories: [],
    nextID: { current: '' },
    tMarkers: markerList,
    setGlobalLat: jest.fn(),
    setGlobalLng: jest.fn(),
    setMarkerShown: jest.fn(),
    setDetailedIWOpen: jest.fn(),
    setGlobalAddress: jest.fn(),
    setAcceptedMarker: jest.fn(),
  };

  const props2: any = {
    globalLat: 0,
    globalLng: 0,
    globalName: '',
    globalMode: '',
    globalAddress: '',
    globalCategory: '',
    acceptedMarker: false,
    globalFilterName: '',
    mapTypeControl: true,
    globalDescription: '',
    mapType: 'ROADMAP',
    globalFilterCategories: [],
    nextID: { current: '' },
    tMarkers: markerList,
    formOpened: true,
    setGlobalLat: jest.fn(),
    setGlobalLng: jest.fn(),
    setMarkerShown: jest.fn(),
    setDetailedIWOpen: jest.fn(),
    setGlobalAddress: jest.fn(),
    setAcceptedMarker: jest.fn(),
  };

  it('should render the component', () => {
    const {container} = render(<Map {...props1} />);
    const mapElement = container.getElementsByClassName('map')
    expect(mapElement[0]).toBeInTheDocument();
  });

  it('should render the component', () => {
    const {container} = render(<Map {...props2} />);
    const mapElement = container.getElementsByClassName('map')
    expect(mapElement[0]).toBeInTheDocument();
  });
});
 