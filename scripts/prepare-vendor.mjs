import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PurgeCSS } from "purgecss";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = resolve(root, "public/vendor/bootstrap");
const srcDir = resolve(root, "src");

function collectSourceFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      collectSourceFiles(fullPath, files);
      continue;
    }
    if (/\.(astro|html|js)$/.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

mkdirSync(vendorDir, { recursive: true });
copyFileSync(
  resolve(root, "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"),
  resolve(vendorDir, "bootstrap.bundle.min.js")
);

const bootstrapCss = readFileSync(
  resolve(root, "node_modules/bootstrap/dist/css/bootstrap.min.css"),
  "utf8"
);

const contentFiles = collectSourceFiles(srcDir);
const [{ css }] = await new PurgeCSS().purge({
  content: contentFiles,
  css: [{ raw: bootstrapCss }],
  safelist: {
    standard: [
      "show",
      "fade",
      "collapsing",
      "collapse",
      "navbar-collapse",
      "active",
      "dropdown-menu",
    ],
    deep: [
      /^navbar/,
      /^dropdown/,
      /^nav-/,
      /^btn/,
      /^container/,
      /^col-/,
      /^row/,
      /^g-/,
      /^d-/,
      /^align-/,
      /^gap-/,
      /^p-/,
      /^m-/,
      /^sticky-/,
      /^mx-/,
      /^text-/,
      /^justify-/,
      /^position-/,
    ],
  },
});

writeFileSync(resolve(vendorDir, "bootstrap.min.css"), css);
console.log(
  `Bootstrap CSS: ${Math.round(bootstrapCss.length / 1024)}KB → ${Math.round(css.length / 1024)}KB (${contentFiles.length} source files scanned)`
);
