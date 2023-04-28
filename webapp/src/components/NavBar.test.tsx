import { render } from "@testing-library/react";
import { NavBar } from "./NavBar";
import { BrowserRouter } from "react-router-dom";


test("Footer renders correctly", () => {

    const {getByText} = render(<BrowserRouter><NavBar locale="en" setLocale={()=>{}}/></BrowserRouter>);

    expect(getByText("Map")).toBeInTheDocument();

});