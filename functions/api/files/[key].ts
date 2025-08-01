// functions/api/files/[key].ts

interface Env {
  ENCLOSED_FILES: R2Bucket;
}

export async function onRequestGet({ params, env }: EventContext<Env>) {
  try {
    const fileKey = params.key;
    if (!fileKey) {
      return new Response("File key is missing", { status: 400 });
    }

    const fileObject = await env.ENCLOSED_FILES.get(fileKey);
    if (!fileObject) {
      return new Response("File not found", { status: 404 });
    }

    const headers = new Headers();
    fileObject.writeHttpMetadata(headers);
    headers.set("Content-Disposition", `attachment; filename="${fileObject.httpMetadata.fileName}"`);

    return new Response(fileObject.body, { headers });
  } catch (err) {
    console.error("File download failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}