import {
  listenAndServe,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chat } from "./chat.ts";

listenAndServe({ port: 8080 }, async (req: ServerRequest): Promise<void> => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./client/build/index.html"),
    });
  }

  if (req.method === "GET" && req.url === "/") {
    if (acceptable(req)) {
      try {
        const ws = await acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        });

        chat(ws);
      } catch (err) {
        console.error(err);
      }
    }
  }
});

console.log("Server running at http://localhost:8080");
