import { render } from "@testing-library/react";
import HomeView from "./HomeView";
import { BrowserRouter } from "react-router-dom";

test('check that HomeView not logged in is rendering propertly', async () => {
    const { getByText } = render(<BrowserRouter><HomeView/></BrowserRouter>);

    expect(getByText("HomeView.welcome!")).toBeInTheDocument();
});
