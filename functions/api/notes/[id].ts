// functions/api/notes/[id].ts

interface Env {
  ENCLOSED_NOTES: KVNamespace; // 替换为你的 KV 命名空间名称
}

export async function onRequestGet({ params, env }: EventContext<Env>) {
  try {
    const noteId = params.id; // 从路由参数中获取 ID

    if (!noteId) {
      return new Response(JSON.stringify({ error: "Note ID is missing" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 从 KV 获取笔记数据
    const noteString = await env.ENCLOSED_NOTES.get(noteId);

    if (!noteString) {
      return new Response(JSON.stringify({ error: "Note not found or expired" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const note = JSON.parse(noteString);

    // 模拟“阅读后删除”逻辑：如果 deleteAfterReading 为 true，则删除 KV 中的笔记
    if (note.deleteAfterReading) {
      await env.ENCLOSED_NOTES.delete(noteId);
      console.log(`Note ${noteId} deleted after reading.`);
    }

    // 这里可以添加密码验证逻辑，如果笔记有密码
    // 但通常密码验证在前端（或在单独的 API）进行，因为 KV 不适合存储明文密码
    // 如果需要后端验证，则需要在前端发送密码到这个 API，并在后端进行比较

    return new Response(JSON.stringify(note), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch note", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}