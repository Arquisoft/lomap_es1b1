import { render } from "@testing-library/react";
import { FriendsView } from "./FriendsView";


test("FriendsView renders correctly", () => {

    const {getByText} = render(<FriendsView loadMarkers={jest.fn}/>);

    expect(getByText("FriendsView.addFriend")).toBeInTheDocument();

});