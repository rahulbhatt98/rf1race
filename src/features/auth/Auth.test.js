import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

test("renders signin form", () => {
  render(<SignIn />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
