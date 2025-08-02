// src/pages/api/note/[id].ts

import type { APIRoute } from 'astro';

// 定义 KV key 的前缀，与 note.ts 文件中的保持一致
const NOTE_PREFIX = 'note:';

/**
 * 处理 GET 请求，用于获取和可选地删除笔记。
 * @param {object} context - Astro 提供的 API 路由上下文对象。
 * @param {object} context.params - 包含动态路由参数的对象。
 * @param {object} context.env - 环境变量，包含 KV 绑定。
 * @returns {Response} - HTTP 响应对象。
 */
export const GET: APIRoute = async ({ params, env }) => {
    // 从动态路由参数中获取笔记 ID
    const noteId = params.id;
    if (!noteId) {
        return new Response(JSON.stringify({ error: 'Note ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const kv = env.NOTES_KV as KVNamespace;
        
        // 从 KV 中获取笔记数据，返回的是字符串
        const noteJson = await kv.get(NOTE_PREFIX + noteId);

        // 如果 KV 中没有找到对应的 key，则返回 404
        if (!noteJson) {
            return new Response(JSON.stringify({ error: 'Note not found or has expired' }), {
                status: 404, // 404 Not Found 状态码
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 将获取到的 JSON 字符串解析为 JavaScript 对象
        const noteData = JSON.parse(noteJson);

        // 检查笔记是否设置了“阅读后删除”
        if (noteData.deleteAfterReading) {
            // 如果是，立即删除 KV 中的数据。
            // 对于 Pages Functions，没有像 Workers 那样的 `ctx.waitUntil`，
            // 直接执行 `await` 操作是最好的方式，它会在响应发送前完成。
            await kv.delete(NOTE_PREFIX + noteId);
        }
        
        // 返回成功响应，包含笔记的 JSON 数据
        return new Response(noteJson, {
            status: 200, // 200 OK 状态码
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        // 捕获任何 KV 操作或 JSON 解析中的错误
        console.error('Failed to retrieve note:', error);
        return new Response(JSON.stringify({ error: 'Server error.' }), {
            status: 500, // 500 Internal Server Error 状态码
            headers: { 'Content-Type': 'application/json' },
        });
    }
};