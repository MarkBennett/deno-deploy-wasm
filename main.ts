import { serve } from "https://deno.land/std@0.145.0/http/server.ts";
import { resize } from "https://deno.land/x/deno_image@0.0.4/mod.ts";

const imgFile = await Deno.readFile("./deno.jpg");
const img = await resize(imgFile, {
  width: 100,
  height: 100,
});

serve(
  (_req: Request) =>
    new Response(img.buffer, {
      status: 200,
      headers: {
        "content-type": "image/png",
      },
    })
);
