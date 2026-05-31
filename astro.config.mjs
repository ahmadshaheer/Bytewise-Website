import { defineConfig } from "astro/config";

// Set your production URL before deploy (required for sitemap/canonicals).
const site = process.env.SITE_URL ?? "https://bytewiseict.com";

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site,
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
