import { describe, expect, it, vi } from "vitest";
import worker from "../../worker/index";

describe("Sites static worker", () => {
  it("serves the SPA shell for a direct portfolio route after an asset miss", async () => {
    const assets = {
      fetch: vi.fn()
        .mockResolvedValueOnce(new Response("Not found", { status: 404 }))
        .mockResolvedValueOnce(new Response("Portfolio shell", { status: 200 })),
    };

    const response = await worker.fetch(new Request("https://portfolio.example/research"), { ASSETS: assets });

    expect(response.status).toBe(200);
    expect(assets.fetch).toHaveBeenCalledTimes(2);
    expect((assets.fetch.mock.calls[1][0] as Request).url).toBe("https://portfolio.example/index.html");
  });

  it("keeps a missing static file as a 404 response", async () => {
    const assets = { fetch: vi.fn().mockResolvedValue(new Response("Not found", { status: 404 })) };

    const response = await worker.fetch(new Request("https://portfolio.example/assets/missing.png"), { ASSETS: assets });

    expect(response.status).toBe(404);
    expect(assets.fetch).toHaveBeenCalledTimes(1);
  });
});
