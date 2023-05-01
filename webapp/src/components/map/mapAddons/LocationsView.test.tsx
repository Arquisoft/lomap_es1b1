import { fireEvent, render, screen } from "@testing-library/react";
import { IPMarker } from "../../../shared/SharedTypes";
import UbicationsView from "./LocationsView";

// Mock the useSession hook
jest.mock('@inrupt/solid-ui-react', () => ({
    __esModule: true,
    useSession: () => ({
        session: { info: { isLoggedIn: true, webId: "https://example.com/user1#me" }, onLogout: jest.fn },
    }),
}));
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


describe("UbicationsView", () => {

    it("displays a list of the user's ubications", async () => {
        render(
            <UbicationsView tMarkers={markerList} />
        );

        const marker1Name = screen.getByText('Test marker 1');
        expect(marker1Name).toBeInTheDocument();
    });

    it("displays a message when the user has no ubications", async () => {
        render(
            <UbicationsView />
        );

        const mapElement = screen.getByText('LocationsView.noLocations');
        expect(mapElement).toBeInTheDocument();
    });

    it("deletes a public location", async () => {
        render(
            <UbicationsView tMarkers={markerList} />
        );
        const deleteButton = screen.getAllByRole('button', { name: 'LocationsView.delete' });
        fireEvent.click(deleteButton[1])
    });

    it("deletes a shared location", async () => {
        render(
            <UbicationsView tMarkers={markerList} />
        );
        const deleteButton = screen.getAllByRole('button', { name: 'LocationsView.delete' });
        fireEvent.click(deleteButton[2])
    });
});
