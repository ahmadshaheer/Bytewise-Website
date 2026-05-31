import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const pages = [
  {
    file: "index.html",
    route: "index",
    page: "home",
    bodyClass: "home-page home-page--neo",
    showFaqLink: true,
    mainStart: 152,
    mainEnd: 891,
  },
  {
    file: "services.html",
    route: "services",
    page: "services",
    bodyClass: "services-page home-page--neo services-page--neo",
    mainStart: 155,
    mainEnd: 432,
  },
  {
    file: "business.html",
    route: "business",
    page: "services",
    bodyClass: "business-page home-page--neo business-page--neo",
    mainStart: 155,
    mainEnd: 330,
  },
  {
    file: "ngo.html",
    route: "ngo",
    page: "services",
    bodyClass: "ngo-page home-page--neo ngo-page--neo",
    mainStart: 155,
    mainEnd: 334,
  },
  {
    file: "government.html",
    route: "government",
    page: "services",
    bodyClass: "government-page home-page--neo government-page--neo",
    mainStart: 155,
    mainEnd: 331,
  },
  {
    file: "projects.html",
    route: "projects",
    page: "projects",
    bodyClass: "projects-page home-page--neo projects-page--neo",
    mainStart: 155,
    mainEnd: 415,
  },
  {
    file: "contact.html",
    route: "contact",
    page: "contact",
    bodyClass: "contact-page home-page--neo contact-page--neo",
    mainStart: 155,
    mainEnd: 392,
  },
];

function fixLinks(html) {
  return html
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="services.html#', 'href="/services/#')
    .replaceAll('href="services.html"', 'href="/services/"')
    .replaceAll('href="business.html"', 'href="/business/"')
    .replaceAll('href="ngo.html"', 'href="/ngo/"')
    .replaceAll('href="government.html"', 'href="/government/"')
    .replaceAll('href="projects.html"', 'href="/projects/"')
    .replaceAll('href="contact.html"', 'href="/contact/"')
    .replaceAll('src="assets/', 'src="/assets/');
}

function parseMeta(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  const descMatch = html.match(
    /<meta\s+name="description"\s+content="([^"]*)"/
  );
  return {
    title: titleMatch?.[1] ?? "Bytewise Technologies",
    description: descMatch?.[1] ?? "",
  };
}

const legacyDir = path.join(root, "src", "legacy");
const pagesDir = path.join(root, "src", "pages");
fs.mkdirSync(legacyDir, { recursive: true });
fs.mkdirSync(pagesDir, { recursive: true });

for (const spec of pages) {
  const sourcePath = path.join(root, spec.file);
  const html = fs.readFileSync(sourcePath, "utf8");
  const lines = html.split(/\r?\n/);
  const mainHtml = fixLinks(
    lines.slice(spec.mainStart - 1, spec.mainEnd).join("\n")
  );
  const { title, description } = parseMeta(html);

  const legacyName = `${spec.route}-main.html`;
  fs.writeFileSync(path.join(legacyDir, legacyName), mainHtml, "utf8");

  const importName = `${spec.route}Main`;
  const showFaq = spec.showFaqLink ? "\n  showFaqLink" : "";
  const pageFile =
    spec.route === "index"
      ? path.join(pagesDir, "index.astro")
      : path.join(pagesDir, `${spec.route}.astro`);

  const astro = `---
import BaseLayout from "../layouts/BaseLayout.astro";
import ${importName} from "../legacy/${legacyName}?raw";

const title = ${JSON.stringify(title)};
const description = ${JSON.stringify(description)};
---

<BaseLayout
  title={title}
  description={description}
  page={${JSON.stringify(spec.page)}}
  bodyClass={${JSON.stringify(spec.bodyClass)}}${showFaq}
>
  <div set:html={${importName}} />
</BaseLayout>
`;

  fs.writeFileSync(pageFile, astro, "utf8");
  console.log(`Wrote ${pageFile}`);
}
