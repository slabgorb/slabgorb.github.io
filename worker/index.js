// Serves the built Jekyll site from the R2 bucket bound as `env.BUCKET`.
//
// Jekyll produces directory-style URLs (e.g. /wmata/ -> wmata/index.html), which
// plain R2 does not resolve on its own. This Worker maps requests to the right
// object, sets Content-Type from the file extension, and serves 404.html for
// misses. Content-Type is derived here so the upload step doesn't have to set it.

const TYPES = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  mjs: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  ico: "image/x-icon",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  eot: "application/vnd.ms-fontobject",
  pdf: "application/pdf",
};

function ext(path) {
  const slash = path.lastIndexOf("/");
  const dot = path.lastIndexOf(".");
  return dot > slash ? path.slice(dot + 1).toLowerCase() : "";
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const key = decodeURIComponent(url.pathname).replace(/^\/+/, "");

    // Build the list of object keys to try, in order.
    const candidates = [];
    if (key === "" || key.endsWith("/")) {
      candidates.push(key + "index.html");
    } else if (ext(key) === "") {
      candidates.push(key + "/index.html"); // /wmata -> wmata/index.html
      candidates.push(key); // extensionless file fallback
    } else {
      candidates.push(key);
    }

    for (const k of candidates) {
      const object = await env.BUCKET.get(k);
      if (object) return serve(object, k, request);
    }

    // Miss -> 404.html with a 404 status.
    const notFound = await env.BUCKET.get("404.html");
    if (notFound) {
      const headers = new Headers({ "content-type": TYPES.html });
      return new Response(request.method === "HEAD" ? null : notFound.body, {
        status: 404,
        headers,
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};

function serve(object, key, request) {
  const headers = new Headers();
  headers.set(
    "content-type",
    TYPES[ext(key)] || object.httpMetadata?.contentType || "application/octet-stream",
  );
  headers.set("etag", object.httpEtag);
  headers.set(
    "cache-control",
    ext(key) === "html"
      ? "public, max-age=0, must-revalidate"
      : "public, max-age=31536000, immutable",
  );

  // Honor conditional requests so browsers can revalidate cheaply.
  const ifNoneMatch = request.headers.get("if-none-match");
  if (ifNoneMatch && ifNoneMatch === object.httpEtag) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(request.method === "HEAD" ? null : object.body, { headers });
}
