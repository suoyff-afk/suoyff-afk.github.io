import { access, copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { transformWithOxc, type Plugin } from "vite";

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export function sitesWorkerOutput(): Plugin {
  let root = process.cwd();

  return {
    name: "sites-worker-output",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async buildStart() {
      await rm(resolve(root, "dist"), { force: true, recursive: true });
    },
    async closeBundle() {
      const dist = resolve(root, "dist");
      const workerSourcePath = resolve(root, "worker", "index.ts");
      const serverDirectory = resolve(dist, "server");
      const workerSource = await readFile(workerSourcePath, "utf8");
      const { code } = await transformWithOxc(workerSource, workerSourcePath, {
        target: "es2022",
      });

      await rm(serverDirectory, { force: true, recursive: true });
      await mkdir(serverDirectory, { recursive: true });
      await writeFile(resolve(serverDirectory, "index.js"), code, "utf8");

      const hostingConfig = resolve(root, ".openai", "hosting.json");
      if (await exists(hostingConfig)) {
        const hostingOutput = resolve(dist, ".openai", "hosting.json");
        await mkdir(resolve(dist, ".openai"), { recursive: true });
        await copyFile(hostingConfig, hostingOutput);
      }
    },
  };
}
