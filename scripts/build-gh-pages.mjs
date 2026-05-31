import { spawnSync } from "node:child_process";

process.env.SITE_URL = "https://ahmadshaheer.github.io";
process.env.BASE_PATH = "/Bytewise-Website/";

const result = spawnSync("npx", ["astro", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
