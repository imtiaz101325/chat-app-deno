import {
  listenAndServe,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";

listenAndServe({ port: 8080 }, async (req: ServerRequest): Promise<void> => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./index.html"),
    });
  }
});

console.log("Server running at http://localhost:8080");
