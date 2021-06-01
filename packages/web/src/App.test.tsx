import { screen } from "@testing-library/react";
import React from "react";
import { App } from "./App";
import { render } from "./test-utils";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
