import { fireEvent, render, screen } from '@testing-library/react';
import DetailedUbicationView from './DetailedInfoWindow';
import { MarkerContextProvider } from '../../../context/MarkerContextProvider';
jest.mock('../../../helpers/SolidHelper');

describe('DetailedUbicationView', () => {
  it('should render the component', () => {
    render(
      <DetailedUbicationView
        markerShown={{
          id: "", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: true,
          reviews: [], webId: ""
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
      />
    );

    expect(screen.getByText('Sin nombre')).toBeInTheDocument();
  });

  it('should show the rating dialog when the button is clicked', async () => {
    render(
      <DetailedUbicationView
        markerShown={{
          id: "", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: false,
          reviews: [], webId: ""
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
      />
    );

    const ratingButton = screen.getByRole('button', { name: 'DetailedInfoWindow.writeReview' });
    fireEvent.click(ratingButton);
    const sendButton = screen.getByRole('button', { name: 'DetailedInfoWindow.send' });
    fireEvent.click(sendButton);

    expect(screen.getByText('DetailedInfoWindow.rateLocation')).toBeInTheDocument();
  });

  it('should show the rating dialog when the button is clicked', async () => {
    render(
      <DetailedUbicationView
        markerShown={{
          id: "", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: false,
          reviews: [], webId: ""
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
      />
    );
    const seeButton = screen.getByRole('button', { name: 'DetailedInfoWindow.seeReviews' });
    fireEvent.click(seeButton);

    expect(screen.getByText('DetailedInfoWindow.noReviews')).toBeInTheDocument();
  });

  it('should show the rating dialog when the button is clicked', async () => {
    render(
      <DetailedUbicationView
        markerShown={{
          id: "", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: false,
          reviews: [{
            author:
              "https://uo271718-dedeuser1.inrupt.net/profile/card#me",
            date:
              new Date(),
            score:
              0,
            comment:
              "",
            pictureURL: ""
          },{author:
            "https://uo271718-dedeuser1.inrupt.net/profile/card#me",
            date:
            new Date(),
            score:
            5,
            comment:
            "Fantastico",
            pictureURL: "https://upload.wikimedia.org/wikipedia/commons/2/24/PARQUE_SAN_FRANCISCO_PAVO_REAL2.JPG"
            }
        ], webId: ""
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
      />
    );
    const seeButton = screen.getByRole('button', { name: 'DetailedInfoWindow.seeReviews' });
    fireEvent.click(seeButton);
  });


});