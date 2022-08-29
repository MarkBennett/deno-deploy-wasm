import { serve } from "https://deno.land/std@0.145.0/http/server.ts";
import { resize } from "https://deno.land/x/deno-image/mod.ts";

const img = await resize(Deno.readFileSync("./deno.png"), {
  width: 100,
  height: 100,
});

serve((req: Request) => new Response(img, { headers: "Content-Type": "image/png"}));
