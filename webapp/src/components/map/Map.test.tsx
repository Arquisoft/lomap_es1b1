import { render, screen } from '@testing-library/react';
import Map from './Map'
import { MarkerContextProvider } from '../../context/MarkerContextProvider';
import { loadMapApi } from '../../utils/GoogleMapsUtils';

// Mock the useSession hook
jest.mock('@inrupt/solid-ui-react', () => ({
  __esModule: true,
  useSession: () => ({
    session: { info: { isLoggedIn: false }, onLogout: jest.fn },
  }),
}));

  describe('Map component', () => {
    const props: any = {
      globalLat: 0,
      globalLng: 0,
      globalName: '',
      globalMode: '',
      globalAddress: '',
      globalCategory: '',
      acceptedMarker: false,
      globalFilterName: '',
      mapTypeControl: false,
      globalDescription: '',
      mapType: 'ROADMAP',
      globalFilterCategories: [],
      nextID: { current: '' },
      setGlobalLat: jest.fn(),
      setGlobalLng: jest.fn(),
      setMarkerShown: jest.fn(),
      setDetailedIWOpen: jest.fn(),
      setGlobalAddress: jest.fn(),
      setAcceptedMarker: jest.fn(),
    };

    it('should render the component', () => {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', function () {
        render(<MarkerContextProvider><Map {...props} /></MarkerContextProvider>);
        const mapElement = screen.getByTestId('map');
        expect(mapElement).toBeInTheDocument();
      });
    });
});
