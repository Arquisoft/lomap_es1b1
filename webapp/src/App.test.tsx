import { render } from "@testing-library/react";
import App from "./App";
import { MarkerContextProvider } from "./context/MarkerContextProvider";
import { BrowserRouter } from "react-router-dom";

test("Footer renders correctly", () => {

    const { getByText } = render(<MarkerContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MarkerContextProvider>);

    expect(getByText("Map")).toBeInTheDocument();

});