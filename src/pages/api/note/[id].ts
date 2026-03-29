import type { APIRoute } from 'astro';
import { localKv } from '../../../utils/local-kv';

export const GET: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    const kv = (env && env.NOTES_KV) ? (env.NOTES_KV as KVNamespace) : localKv;
    const noteJson = await kv.get(`note:${noteId}`);

    if (!noteJson) {
        return new Response(JSON.stringify({ error: '笔记已过期或不存在' }), { 
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let note = JSON.parse(noteJson);

    // 逻辑：处理访问次数限制
    if (note.maxAccess !== null && note.maxAccess !== undefined) {
        note.maxAccess -= 1;
        if (note.maxAccess <= 0) {
            // 达到次数限制，立即删除
            await kv.delete(`note:${noteId}`);
        } else {
            // 更新剩余次数
            await kv.put(`note:${noteId}`, JSON.stringify(note));
        }
    }

    return new Response(JSON.stringify(note), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

export const DELETE: APIRoute = async ({ params, env }) => {
    const noteId = params.id;
    const kv = (env && env.NOTES_KV) ? (env.NOTES_KV as KVNamespace) : localKv;
    await kv.delete(`note:${noteId}`);
    
    return new Response(JSON.stringify({ 
        message: '笔记已成功销毁',
        id: noteId 
    }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};