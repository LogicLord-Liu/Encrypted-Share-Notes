// src/pages/api/note.ts

import type { APIRoute } from 'astro';

// 定义 KV key 的前缀，以避免与其他数据冲突
const NOTE_PREFIX = 'note:';

/**
 * 处理 POST 请求，用于创建新笔记。
 * @param {object} context - Astro 提供的 API 路由上下文对象。
 * @param {Request} context.request - 传入的 HTTP 请求对象。
 * @param {object} context.env - 环境变量，包含 KV 绑定。
 * @returns {Response} - HTTP 响应对象。
 */
export const POST: APIRoute = async ({ request, env }) => {
    try {
        // 尝试解析请求体中的 JSON 数据
        const noteData = await request.json();
        const noteId = noteData.id;

        // 验证请求体中是否包含 id
        if (!noteId) {
            return new Response(JSON.stringify({ error: 'Note ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 访问 KV 绑定变量。`NOTES_KV` 是在 Pages 设置中配置的变量名。
        const kv = env.NOTES_KV as KVNamespace;
        if (!kv) {
            // ⭐ 重点检查这里，如果 env.NOTES_KV 不存在，这就是你的问题所在！
            console.error("Pages Function: KV namespace binding 'NOTES_KV' is missing.");
            return new Response(JSON.stringify({ error: "KV namespace is not configured." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        // 将整个笔记数据（已加密）作为 JSON 字符串存入 KV
        // 键名使用 NOTE_PREFIX + noteId，值是 noteData 的 JSON 字符串形式
        await kv.put(NOTE_PREFIX + noteId, JSON.stringify(noteData));

        // 成功响应，返回创建成功的消息和 ID
        return new Response(JSON.stringify({ message: 'Note created successfully', id: noteId }), {
            status: 201, // 201 Created 状态码
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // 捕获任何解析 JSON 或 KV 存储过程中的错误
        console.error('Pages Function: Caught an error during note creation:', error);
        return new Response(JSON.stringify({ error: 'Invalid JSON or other server error.' }), {
            status: 500, // 500 Internal Server Error 状态码
            headers: { 'Content-Type': 'application/json' },
        });
    }
};