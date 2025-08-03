// src/pages/api/note.ts

import type { APIRoute } from 'astro';
import { localKv } from '../../utils/local-kv';

const NOTE_PREFIX = 'note:';

export const POST: APIRoute = async ({ request, env }) => {
    try {
        console.log("KV DEBUG: Pages Function 开始执行。");

        // ⭐️ 步骤 2: 关键修复！在使用 env 之前先检查 env 是否存在。
        // 如果 env 存在且 env.NOTES_KV 存在，就使用它；否则使用本地模拟对象。
        const kv = (env && env.NOTES_KV) ? env.NOTES_KV as KVNamespace : localKv;

        console.log("KV DEBUG: 已获取 KV 实例（本地或远程）。");

        const noteData = await request.json();
        console.log("KV DEBUG: 成功解析 JSON 数据。");

        const noteId = noteData.id;
        if (!noteId) {
            console.error("KV DEBUG: JSON 数据中缺少 Note ID。");
            return new Response(JSON.stringify({ error: 'Note ID 是必需的' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        console.log(`KV DEBUG: 接收到的 Note ID: ${noteId}`);

        const kvKey = NOTE_PREFIX + noteId;
        const kvValue = JSON.stringify(noteData);
        console.log(`KV DEBUG: 尝试写入 KV。键: ${kvKey}, 值长度: ${kvValue.length}`);

        await kv.put(kvKey, kvValue);

        console.log("KV DEBUG: KV 写入操作成功。");

        return new Response(JSON.stringify({ message: '笔记创建成功', id: noteId }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('KV DEBUG: 发生意外错误:', error);
        return new Response(JSON.stringify({ error: '服务器内部错误。' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};