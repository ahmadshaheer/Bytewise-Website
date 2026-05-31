import { defineConfig } from "astro/config";

// Production (bytewiseict.com) — defaults below.
// GitHub Pages — set in .github/workflows/deploy.yml:
//   SITE_URL=https://ahmadshaheer.github.io  BASE_PATH=/Bytewise-Website/
const site = process.env.SITE_URL ?? "https://bytewiseict.com";
const base = process.env.BASE_PATH ?? "/";

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  redirects: {
    "/services.html": "/services/",
    "/business.html": "/business/",
    "/ngo.html": "/ngo/",
    "/government.html": "/government/",
    "/projects.html": "/projects/",
    "/contact.html": "/contact/",
  },
});
