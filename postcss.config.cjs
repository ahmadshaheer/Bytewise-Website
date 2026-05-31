const purgecss = require("@fullhuman/postcss-purgecss");

const purgeSafelist = {
  standard: [
    "show",
    "fade",
    "collapsing",
    "collapse",
    "is-visible",
    "is-active",
    "is-swapping",
    "active",
  ],
  deep: [
    /^neo-/,
    /^reveal/,
    /^glass-/,
    /^tilt-/,
    /^agency-/,
    /^services-/,
    /^service-/,
    /^projects-/,
    /^project-/,
    /^contact-/,
    /^home-page/,
    /^business-page/,
    /^navbar/,
    /^dropdown/,
    /^nav-/,
    /^btn-/,
    /^brand-/,
    /^theme-/,
    /^site-/,
    /^header-/,
    /^footer-/,
    /^orb/,
  ],
};

module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? [
          purgecss({
            content: ["./src/**/*.{astro,html,js}"],
            safelist: purgeSafelist,
          }),
        ]
      : [],
};
