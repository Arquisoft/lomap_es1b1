import { fireEvent, render, screen } from '@testing-library/react';
import DetailedUbicationView from './DetailedInfoWindow';
import { IPMarker } from '../../../shared/SharedTypes';
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
  it('should render the component', () => {
    const marker1: IPMarker = {
      id: "test",
      date: new Date(),
      lat: 0,
      lng: 0,
      name: "Sin nombre",
      webId: "https://example.com/user1#me",
      address: "Sin direccion",
      category: "Sin categoría",
      isPublic: false,
      reviews: [],
      canFriendsSee: false,
      description: "Sin descripción",
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
      id: "test 2",
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
    render(
      <DetailedUbicationView
        markerShown={{
          id: "test", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: false,
          reviews: [], webId: "https://example.com/user1#me"
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
        tMarkers={markerList}
      />
    );

    const seeButton = screen.getByRole('checkbox');
    fireEvent.click(seeButton)
  });

  it('should render the component', () => {
    const marker1: IPMarker = {
      id: "test",
      date: new Date(),
      lat: 0,
      lng: 0,
      name: "Sin nombre",
      webId: "https://example.com/user1#me",
      address: "Sin direccion",
      category: "Sin categoría",
      isPublic: false,
      reviews: [],
      canFriendsSee: false,
      description: "Sin descripción",
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
      id: "test 2",
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
    render(
      <DetailedUbicationView
        markerShown={{
          id: "test 2", date: new Date(), lat: 0, lng: 0, name: "Sin nombre", address: "Sin dirección",
          category: "Sin categoría", isPublic: false, description: "Sin descripción", canFriendsSee: true,
          reviews: [], webId: "https://example.com/user1#me"
        }}
        isDetailedIWOpen={true}
        setDetailedIWOpen={jest.fn()}
        tMarkers={markerList}
      />
    );

    const seeButton = screen.getByRole('checkbox');
    fireEvent.click(seeButton)
  });

});