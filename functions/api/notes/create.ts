// functions/api/notes/create.ts

// 定义 KV 绑定类型，用于 TypeScript 智能提示
interface Env {
  ENCLOSED_NOTES: KVNamespace; // 替换为你的 KV 命名空间名称
}

export async function onRequestPost({ request, env }: EventContext<Env>) {
  try {
    const note = await request.json();

    // 可以在这里添加更多验证逻辑
    if (!note.id || !note.content) {
      return new Response(JSON.stringify({ error: "Invalid note data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 将笔记数据存入 KV
    // 注意：KV 的值必须是字符串，所以我们将对象 JSON.stringify 化
    await env.ENCLOSED_NOTES.put(note.id, JSON.stringify(note), {
      // 可以在这里设置过期时间，根据 note.expiration 字段
      // 例如：expirationTtl: calculateTtl(note.expiration)
    });

    return new Response(JSON.stringify({ message: "Note created successfully", id: note.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return new Response(JSON.stringify({ error: "Failed to create note", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}