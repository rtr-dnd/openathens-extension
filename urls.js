const redirector = "https://go.openathens.net/redirector/u-tokyo.ac.jp";

export function doiUrl(text) {
  let doi = text.trim();
  const resolver = /^https?:\/\/(?:dx\.)?doi\.org\//i;

  if (resolver.test(doi)) {
    try {
      doi = decodeURIComponent(new URL(doi).pathname.slice(1));
    } catch {
      return null;
    }
  } else {
    doi = doi.replace(/^doi:\s*/i, "");
  }

  if (!/^10\.\d{4,}\/[^\s<>]+$/iu.test(doi)) {
    return null;
  }

  try {
    const path = doi.split("/").map(encodeURIComponent).join("/");
    return `https://doi.org/${path}`;
  } catch {
    return null;
  }
}

export function openAthensUrl(target) {
  let url;
  try {
    url = new URL(target);
  } catch {
    return null;
  }

  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    return null;
  }

  if (url.hostname === "go.openathens.net" && url.pathname.startsWith("/redirector/")) {
    return null;
  }

  return `${redirector}?url=${encodeURIComponent(target)}`;
}
