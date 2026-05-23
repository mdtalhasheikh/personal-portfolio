import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DigitalTwinChat } from "../app/components/DigitalTwinChat";

describe("DigitalTwinChat", () => {
  it("renders an accessible chat form with privacy disclosure", () => {
    render(<DigitalTwinChat />);

    expect(screen.getByLabelText("Ask the Digital Twin")).toBeInTheDocument();
    expect(screen.getByText("Talah Digital Twin")).toBeInTheDocument();
    expect(screen.getByText(/sent to OpenRouter/i)).toBeInTheDocument();
  });
});
