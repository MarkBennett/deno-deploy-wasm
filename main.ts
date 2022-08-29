import { serve } from "https://deno.land/std@0.145.0/http/server.ts";
import { resize } from "https://deno.land/x/deno_image@0.0.4/mod.ts";

async function getImageData(): Promise<Uint8Array> {
  const imgFile = await Deno.readFile("./deno.jpg");
  return imgFile;
}

async function resizeImg(
  imgFile: Uint8Array,
  size: number
): Promise<Uint8Array> {
  const img = await resize(imgFile, {
    width: size,
    height: size,
  });
  return img;
}

serve(async (req: Request) => {
  // Parse size from request
  const params = new URL(req.url).searchParams;
  const sizeStr = params.get("size") || "100";
  const size = parseInt(sizeStr);

  const img = await getImageData();
  const resizedImg = await resizeImg(img, size);

  return new Response(resizedImg.buffer, {
    status: 200,
    headers: {
      "content-type": "image/jpg",
    },
  });
});
