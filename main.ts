const PREFIX = "/xk29-my-secret"; // замените на свой набор букв и цифр

Deno.serve(async (request) => {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(PREFIX + "/")) {
    return new Response("Not found", { status: 404 });
  }
  const path = url.pathname.slice(PREFIX.length); // /api/v1/...
  const headers = new Headers(request.headers);
  headers.delete("host");
  const hasBody = !["GET", "HEAD"].includes(request.method);
  return fetch("https://openrouter.ai" + path + url.search, {
    method: request.method,
    headers,
    body: hasBody ? request.body : null,
  });
});
