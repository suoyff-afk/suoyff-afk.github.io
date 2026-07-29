import { describe, expect, it } from "vitest";
import { assetUrl, routerBasename } from "../app/routes";

describe("base path utilities", () => {
  it("derives a safe router basename", () => {
    expect(routerBasename("/")).toBe("/");
    expect(routerBasename("/portfolio/")).toBe("/portfolio");
  });

  it("builds an asset URL beneath the configured base", () => {
    expect(assetUrl("assets/workflow-concept.png", "/portfolio/")).toBe("/portfolio/assets/workflow-concept.png");
    expect(assetUrl("/assets/workflow-concept.png", "/")).toBe("/assets/workflow-concept.png");
  });
});
