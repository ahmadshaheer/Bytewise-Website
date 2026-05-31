/** Build a site path that respects Astro `base` (e.g. `/services/` or `/Bytewise-Website/services/`). */
export function path(route: string, base: string): string {
  if (!route || route === "/") return base;
  const segment = route.startsWith("/") ? route.slice(1) : route;
  return `${base}${segment}`;
}

/** Prefix root-relative URLs in raw HTML when Astro `base` is not `/`. */
export function withBase(html: string, base: string): string {
  if (!base || base === "/") return html;
  let result = html
    .replace(/\bhref="\//g, `href="${base}`)
    .replace(/\bsrc="\//g, `src="${base}`);

  result = result.replace(/data-rotate-images="([^"]+)"/g, (_, value: string) => {
    const paths = value.split("|").map((segment) => {
      const trimmed = segment.trim();
      if (trimmed.startsWith("/")) {
        return `${base}${trimmed.slice(1)}`;
      }
      return trimmed;
    });
    return `data-rotate-images="${paths.join("|")}"`;
  });

  return result;
}

/** Strip Astro `base` from a pathname for route matching (e.g. active nav). */
export function stripBase(pathname: string, base: string): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const prefix = base.replace(/\/$/, "");
  if (!prefix || prefix === "") return normalized;
  if (normalized === prefix) return "/";
  if (normalized.startsWith(`${prefix}/`)) {
    return normalized.slice(prefix.length) || "/";
  }
  return normalized;
}
