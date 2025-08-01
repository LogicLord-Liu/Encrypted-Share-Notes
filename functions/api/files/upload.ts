// functions/api/files/upload.ts

interface Env {
  ENCLOSED_FILES: R2Bucket;
}

export async function onRequestPost({ request, env }: EventContext<Env>) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    // 确保文件大小在合理范围内 (例如 < 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return new Response("File too large", { status: 413 });
    }

    // 为文件创建一个唯一的键名，防止冲突
    const fileKey = `${Date.now()}-${file.name}`;

    // 将文件内容（blob）上传到 R2
    await env.ENCLOSED_FILES.put(fileKey, file.stream());

    // 返回文件的可访问路径
    return new Response(JSON.stringify({ fileKey }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("File upload failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}