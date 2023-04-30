import { render, screen, fireEvent } from '@testing-library/react';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { v4 as uuid } from 'uuid';
import MapView from './MapView';
import { loadMapApi } from '../../../utils/GoogleMapsUtils';
import { MarkerContextProvider } from '../../../context/MarkerContextProvider';

describe('MapView component', () => {

    test('renders MapView component', () => {
        const googleMapScript = loadMapApi();
        googleMapScript.addEventListener('load', function () {
            render(
                <MarkerContextProvider>
                    <MapView locale='es'/>
                </MarkerContextProvider>
            );
            expect(screen.getByText('Filtros')).toBeInTheDocument();
            const button = screen.getByRole('button', { name: 'MapView.filters' });
            //fireEvent.click(button)
        });

    });
});