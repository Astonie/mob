import sanitizeHtmlLib from "sanitize-html";

export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtmlLib(html, {
    allowedTags: sanitizeHtmlLib.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      "*": ["class", "id"],
      img: ["src", "alt", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
    },
  });
}
