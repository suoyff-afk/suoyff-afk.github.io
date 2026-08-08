import { describe, expect, it, vi } from "vitest";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ResolvedConfig } from "vite";
import { sitesWorkerOutput } from "../../build/sites-vite-plugin.ts";
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

describe("static deployment output", () => {
  it("emits a GitHub Pages fallback without changing Sites output", async () => {
    const root = await mkdtemp(join(tmpdir(), "research-portfolio-build-"));

    try {
      await mkdir(join(root, "worker"), { recursive: true });
      await mkdir(join(root, ".openai"), { recursive: true });
      await mkdir(join(root, "dist", "client"), { recursive: true });
      await writeFile(join(root, "worker", "index.ts"), "export default { fetch() { return new Response('ok') } }", "utf8");
      await writeFile(join(root, ".openai", "hosting.json"), '{"project_id":"test-project"}', "utf8");
      await writeFile(join(root, "dist", "client", "index.html"), "<main>Portfolio shell</main>", "utf8");

      const plugin = sitesWorkerOutput();
      const configure = plugin.configResolved as (config: ResolvedConfig) => void;
      const closeBundle = plugin.closeBundle as () => Promise<void>;
      configure({ root } as ResolvedConfig);
      await closeBundle();

      expect(await readFile(join(root, "dist", "server", "index.js"), "utf8")).toContain("Response");
      expect(await readFile(join(root, "dist", ".openai", "hosting.json"), "utf8")).toContain("test-project");
      expect(await readFile(join(root, "dist", "client", "404.html"), "utf8")).toBe("<main>Portfolio shell</main>");
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
